import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SOURCE, TARGET_REGIONS, findTargetRegion, type Region } from '../../config/regions';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import {
  FACING_LAT,
  angleBetween,
  arcPoints,
  fibonacciLatLon,
  latLonToVec3,
  type Vec3,
} from './geo';
import { isLand } from './landMask';

// Brand palette (mirrors tailwind.config.js aether-* tokens; three.js needs raw values).
const C = {
  cyan: '#00F0FF',
  green: '#00FF9D',
  amber: '#FFB800',
  red: '#FF3B30',
  idle: '#5B6B7F',
  ocean: '#060A12',
} as const;

const R = 2;
const DEG = Math.PI / 180;
const EARTH_RADIUS_KM = 6371;

type Phase = 'sync' | 'inflight' | 'secured' | 'chaos';

function phaseOf(status: string, chaos: boolean): Phase {
  if (chaos) return 'chaos';
  if (status === 'ACTIVE_SYNC') return 'sync';
  if (status === 'TARGET_SECURED') return 'secured';
  return 'inflight';
}

/** Target marker color: a healthy standby replica is green, distinct from the cyan primary. */
const TARGET_COLOR: Record<Phase, string> = {
  sync: C.green,
  inflight: C.amber,
  secured: C.green,
  chaos: C.red,
};

const PHASE_STYLE: Record<Phase, { color: string; speed: number; packets: number; label: string }> =
  {
    sync: { color: C.cyan, speed: 0.35, packets: 3, label: 'Replicating' },
    inflight: { color: C.amber, speed: 1.1, packets: 6, label: 'Failover in progress' },
    secured: { color: C.green, speed: 0.25, packets: 2, label: 'Target active' },
    chaos: { color: C.red, speed: 0.6, packets: 4, label: 'Chaos injected: jitter + packet loss' },
  };

const STAGE_LABEL: Record<string, string> = {
  QUIESCE_AND_SNAPSHOT: 'Quiesce + snapshot',
  HYDRATING_TARGET: 'Hydrating target',
  DNS_CUTOVER: 'DNS cutover',
};

const v3 = (p: Vec3) => new THREE.Vector3(p[0], p[1], p[2]);

// ---------------------------------------------------------------------------
// Earth: dark ocean, faint graticule, continents as a dot matrix, atmosphere rim
// ---------------------------------------------------------------------------

function Graticule() {
  const lines = useMemo(() => {
    const out: Vec3[][] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      out.push(
        Array.from({ length: 73 }, (_, i) => latLonToVec3({ lat, lon: -180 + i * 5 }, R * 1.001)),
      );
    }
    for (let lon = -180; lon < 180; lon += 30) {
      out.push(
        Array.from({ length: 37 }, (_, i) => latLonToVec3({ lat: -90 + i * 5, lon }, R * 1.001)),
      );
    }
    return out;
  }, []);
  return (
    <group>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={C.cyan} lineWidth={0.6} transparent opacity={0.07} />
      ))}
    </group>
  );
}

function LandDots() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const positions = useMemo(
    () =>
      fibonacciLatLon(14000)
        .filter((p) => isLand(p.lat, p.lon))
        .map((p) => latLonToVec3(p, R * 1.002)),
    [],
  );

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.set(p[0], p[1], p[2]);
      dummy.lookAt(p[0] * 2, p[1] * 2, p[2] * 2); // face outward
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]}>
      <circleGeometry args={[0.011, 6]} />
      <meshBasicMaterial color={C.cyan} transparent opacity={0.55} toneMapped={false} />
    </instancedMesh>
  );
}

const atmosphereShader = {
  uniforms: { glowColor: { value: new THREE.Color(C.cyan) } },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 glowColor;
    varying vec3 vNormal;
    void main() {
      float rim = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      gl_FragColor = vec4(glowColor, clamp(rim, 0.0, 1.0) * 0.9);
    }`,
};

function Earth() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshBasicMaterial color={C.ocean} />
      </mesh>
      <Graticule />
      <LandDots />
      {/* Atmosphere: back-face fresnel shell, additive so it glows on dark backgrounds */}
      <mesh scale={1.13}>
        <sphereGeometry args={[R, 64, 64]} />
        <shaderMaterial
          args={[atmosphereShader]}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Regions: marker dot, pulse ring, label
// ---------------------------------------------------------------------------

type MarkerRole = 'source' | 'target' | 'standby';

/** Label offsets keep neighbors apart (Ashburn and Boydton are ~270 km apart). */
const LABEL_SIDE: Record<string, 'left' | 'right' | 'below'> = {
  [SOURCE.id]: 'right',
  'azure-eastus2': 'below',
  'gcp-us-central1': 'left',
  'aws-us-west-2': 'left',
};

function RegionMarker({
  region,
  role,
  color,
  pulse,
  still,
  showLabel,
}: {
  region: Region;
  role: MarkerRole;
  color: string;
  pulse: number;
  still: boolean;
  showLabel: boolean;
}) {
  const pos = useMemo(() => v3(latLonToVec3(region, R * 1.004)), [region]);
  const ring = useRef<THREE.Mesh>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const orient = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.copy(pos);
    o.lookAt(pos.clone().multiplyScalar(2));
    return o.quaternion.clone();
  }, [pos]);

  useFrame(({ clock }) => {
    if (!ring.current || !ringMat.current) return;
    const t = still ? 0.35 : (clock.getElapsedTime() * pulse) % 1;
    ring.current.scale.setScalar(1 + t * 2.4);
    ringMat.current.opacity = (1 - t) * (role === 'standby' ? 0.25 : 0.7);
  });

  const size = role === 'standby' ? 0.035 : 0.055;
  const side = LABEL_SIDE[region.id] ?? 'right';

  return (
    <group position={pos} quaternion={orient}>
      <mesh>
        <circleGeometry args={[size, 24]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[size * 1.15, size * 1.45, 32]} />
        <meshBasicMaterial ref={ringMat} color={color} transparent toneMapped={false} />
      </mesh>
      {showLabel && (
        <Html center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div
            className={`whitespace-nowrap font-mono text-[10px] leading-tight px-1.5 py-0.5 rounded-md border bg-black/60 backdrop-blur-sm ${
              role === 'standby' ? 'border-white/10 text-zinc-500' : 'border-white/15 text-white'
            }`}
            style={{
              transform:
                side === 'left'
                  ? 'translate(-58%, -50%)'
                  : side === 'below'
                    ? 'translate(0, 70%)'
                    : 'translate(58%, -50%)',
            }}
          >
            <span style={{ color }}>{region.cloud}</span>{' '}
            {region.id.replace(/^(aws|gcp|azure)-/, '')}
            {role !== 'standby' && <span className="block text-zinc-400">{region.city}</span>}
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Replication arc with comet-trail packets
// ---------------------------------------------------------------------------

const TRAIL = 6;

function ReplicationArc({
  from,
  to,
  color,
  speed,
  packets,
  jitter,
  still,
}: {
  from: Region;
  to: Region;
  color: string;
  speed: number;
  packets: number;
  jitter: boolean;
  still: boolean;
}) {
  const points = useMemo(() => arcPoints(from, to, R).map(v3), [from, to]);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const base = still ? 0.5 : clock.getElapsedTime() * speed;
    g.children.forEach((child, i) => {
      const packet = Math.floor(i / TRAIL);
      const step = i % TRAIL;
      const visible = packet < packets;
      child.visible = visible;
      if (!visible) return;
      let t = (base + packet / packets - step * 0.012) % 1;
      if (t < 0) t += 1;
      const p = curve.getPoint(t);
      if (jitter && !still) {
        p.x += (Math.random() - 0.5) * 0.05;
        p.y += (Math.random() - 0.5) * 0.05;
      }
      child.position.copy(p);
    });
  });

  return (
    <group>
      <Line points={points} color={color} lineWidth={1.4} transparent opacity={0.35} />
      {/* Soft glow underlay for the arc */}
      <Line points={points} color={color} lineWidth={5} transparent opacity={0.07} />
      <group ref={group}>
        {Array.from({ length: 6 * TRAIL }, (_, i) => {
          const step = i % TRAIL;
          return (
            <mesh key={i}>
              <sphereGeometry args={[0.032 * (1 - step / (TRAIL + 1)), 10, 10]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={step === 0 ? 1 : 0.55 * (1 - step / TRAIL)}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Scene: tilted so the continental US faces the camera, with a gentle sway
// ---------------------------------------------------------------------------

function World({
  target,
  phase,
  still,
  compact,
}: {
  target: Region;
  phase: Phase;
  still: boolean;
  compact: boolean;
}) {
  const sway = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (sway.current)
      sway.current.rotation.y = still ? 0 : Math.sin(clock.getElapsedTime() * 0.12) * 0.3;
  });
  const style = PHASE_STYLE[phase];
  // After a secured failover the target serves traffic; replication runs back to the old
  // primary (ready for failback), so the stream reverses direction.
  const [from, to] = phase === 'secured' ? [target, SOURCE] : [SOURCE, target];
  const sourceColor = phase === 'secured' ? C.idle : phase === 'chaos' ? C.red : C.cyan;

  return (
    <group rotation={[FACING_LAT * DEG, 0, 0]}>
      <group ref={sway}>
        <Earth />
        <RegionMarker
          region={SOURCE}
          role="source"
          color={sourceColor}
          pulse={phase === 'secured' ? 0.25 : 0.6}
          still={still}
          showLabel
        />
        {TARGET_REGIONS.map((r) =>
          r.id === target.id ? (
            <RegionMarker
              key={r.id}
              region={r}
              role="target"
              color={TARGET_COLOR[phase]}
              pulse={phase === 'inflight' ? 1.6 : 0.7}
              still={still}
              showLabel
            />
          ) : (
            <RegionMarker
              key={r.id}
              region={r}
              role="standby"
              color={C.idle}
              pulse={0.3}
              still={still}
              showLabel={!compact}
            />
          ),
        )}
        <ReplicationArc
          from={from}
          to={to}
          color={style.color}
          speed={style.speed}
          packets={style.packets}
          jitter={phase === 'chaos'}
          still={still}
        />
      </group>
    </group>
  );
}

export default function GlobalTopologyCanvas({
  status = 'ACTIVE_SYNC',
  targetRegion = 'gcp-us-central1',
  chaosActive = false,
}: {
  status?: string;
  targetRegion?: string;
  chaosActive?: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const target = findTargetRegion(targetRegion);
  const phase = phaseOf(status, chaosActive);
  const style = PHASE_STYLE[phase];
  const distanceKm = Math.round((angleBetween(SOURCE, target) * EARTH_RADIUS_KM) / 10) * 10;
  const compact = typeof window !== 'undefined' && window.innerWidth < 640;
  const stage = STAGE_LABEL[status];

  return (
    <div className="w-full h-80 md:h-[26rem] rounded-2xl overflow-hidden border border-white/10 bg-aether-ink/80 relative shadow-2xl backdrop-blur-xl mb-6">
      {/* Route + state readout */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <span
          className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
          style={{ backgroundColor: style.color, boxShadow: `0 0 10px ${style.color}` }}
          aria-hidden="true"
        />
        <span className="text-[11px] font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-zinc-200 max-w-full">
          {SOURCE.id} <span aria-label="to">→</span> {target.id}
          <span className="text-zinc-500"> · </span>
          <span style={{ color: style.color }}>{stage ?? style.label}</span>
        </span>
      </div>

      {/* Legend + facts */}
      <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-zinc-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: phase === 'secured' ? C.idle : C.cyan }}
          />
          {phase === 'secured' ? 'Former primary' : 'Primary'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: TARGET_COLOR[phase] }} />
          Target
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: C.idle }} />
          Standby
        </span>
        <span className="text-zinc-500">≈{distanceKm.toLocaleString('en-US')} km great-circle</span>
      </div>
      <div className="absolute bottom-3 right-3 z-10 hidden sm:block text-[10px] font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
        Drag to rotate
      </div>

      <p className="sr-only">
        Globe showing replication from {SOURCE.label} to {target.label}, about {distanceKm}{' '}
        kilometers apart. State: {stage ?? style.label}.
      </p>

      {/* dpr cap: high-density phones render at most 1.5x, cutting GPU work by up to 4x. */}
      <Canvas camera={{ position: [0, 0, 6.3], fov: 42 }} dpr={[1, 1.5]} aria-hidden="true">
        <World target={target} phase={phase} still={reducedMotion} compact={compact} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
          minAzimuthAngle={-Math.PI / 2.2}
          maxAzimuthAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
