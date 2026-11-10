// Real-time 3D scene for the landing page: a legacy server rack streams data blocks into a
// glass vault (your AWS account), and a recovery server materializes on demand.
// Illustrative; loaded lazily and rendered only while on screen.
import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// Brand palette (mirrors tailwind.config.js aether-* tokens; three.js needs raw values).
const C = {
  cyan: '#00F0FF',
  green: '#00FF9D',
  ink: '#050505',
  chassis: '#1A2233',
  blade: '#0E1420',
  trim: '#3A4A63',
} as const;

const RACK_X = -3.7;
const VAULT_X = 0.2;
const TARGET_X = 3.9;
const PACKETS = 28;
const CYCLE = 9; // seconds per recovery cycle of the target server
const BLADES = [-1.0, -0.67, -0.34, -0.01, 0.32, 0.65, 0.98];

function Label({
  position,
  title,
  sub,
  compact,
}: {
  position: [number, number, number];
  title: string;
  sub: string;
  compact: boolean;
}) {
  return (
    <Html position={position} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
      <div className="whitespace-nowrap text-center">
        <p className={`${compact ? 'text-[9px]' : 'text-[11px]'} font-semibold text-white`}>
          {title}
        </p>
        {!compact && <p className="text-[10px] font-mono text-zinc-400">{sub}</p>}
      </div>
    </Html>
  );
}

function GroundRing({ color }: { color: string }) {
  return (
    <mesh position={[0, -1.39, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.05, 1.12, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.45} />
    </mesh>
  );
}

/**
 * A 42U-style server chassis: body, front blades with status LEDs, vent strips.
 * `level` (0..1, via ref) fades the whole unit in, for the recovered server.
 */
function Chassis({
  accent,
  still,
  materialize = false,
}: {
  accent: string;
  still: boolean;
  materialize?: boolean;
}) {
  const leds = useRef<THREE.MeshStandardMaterial[]>([]);
  const fades = useRef<THREE.Material[]>([]);
  const light = useRef<THREE.PointLight>(null);
  const track = (m: THREE.Material | null) => {
    if (m && !fades.current.includes(m)) fades.current.push(m);
  };

  useFrame(({ clock }) => {
    const t = still ? 1.2 : clock.elapsedTime;
    // Recovered server: build up over the first 60% of the cycle, hold, then reset.
    const level = materialize ? (still ? 1 : Math.min(1, (t % CYCLE) / CYCLE / 0.6)) : 1;
    fades.current.forEach((m) => {
      m.transparent = materialize;
      m.opacity = materialize ? 0.06 + 0.94 * level : 1;
    });
    leds.current.forEach((m, i) => {
      if (!m) return;
      const blink = still ? 1 : 0.5 + 1.8 * Math.max(0, Math.sin(t * 5 + i * 1.9));
      m.emissiveIntensity = blink * level;
    });
    if (light.current) light.current.intensity = 5 * level;
  });

  return (
    <group>
      <mesh>
        <boxGeometry args={[1.3, 2.7, 1.1]} />
        <meshStandardMaterial ref={track} color={C.chassis} metalness={0.75} roughness={0.32} />
        <Edges color={accent} threshold={15} />
      </mesh>
      {BLADES.map((y, i) => (
        <group key={y} position={[0, y, 0.556]}>
          <mesh>
            <boxGeometry args={[1.12, 0.26, 0.02]} />
            <meshStandardMaterial ref={track} color={C.blade} metalness={0.6} roughness={0.45} />
          </mesh>
          {[-0.42, -0.3, -0.18, -0.06].map((x) => (
            <mesh key={x} position={[x, 0, 0.012]}>
              <boxGeometry args={[0.06, 0.16, 0.005]} />
              <meshStandardMaterial ref={track} color={C.trim} metalness={0.4} roughness={0.6} />
            </mesh>
          ))}
          <mesh position={[0.38, 0, 0.014]}>
            <boxGeometry args={[0.07, 0.07, 0.01]} />
            <meshStandardMaterial
              ref={(m) => {
                track(m);
                if (m) leds.current[i] = m;
              }}
              color={accent}
              emissive={accent}
              emissiveIntensity={1.2}
            />
          </mesh>
          <mesh position={[0.48, 0, 0.014]}>
            <boxGeometry args={[0.04, 0.04, 0.01]} />
            <meshStandardMaterial
              ref={track}
              color={i % 3 ? accent : C.green}
              emissive={i % 3 ? accent : C.green}
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
      <pointLight ref={light} position={[0, 0.2, 1.6]} color={accent} intensity={5} distance={4} />
      <GroundRing color={accent} />
    </group>
  );
}

function Stream({ still }: { still: boolean }) {
  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(RACK_X + 0.75, 0.5, 0),
        new THREE.Vector3((RACK_X + VAULT_X) / 2, 1.8, 0.4),
        new THREE.Vector3(VAULT_X - 1.2, 0.5, 0),
      ),
    [],
  );
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    const t = still ? 0.4 : clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const u = (t * 0.3 + i / PACKETS) % 1;
      m.position.copy(curve.getPoint(u));
      m.scale.setScalar(0.35 + 0.9 * Math.sin(Math.PI * u));
      m.rotation.set(t + i, t * 1.3 + i, 0);
    });
  });
  const points = useMemo(() => curve.getPoints(40), [curve]);
  return (
    <group>
      <Line points={points} color={C.cyan} lineWidth={1} transparent opacity={0.2} />
      {Array.from({ length: PACKETS }, (_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) refs.current[i] = m;
          }}
        >
          <boxGeometry args={[0.09, 0.09, 0.09]} />
          <meshStandardMaterial color={C.cyan} emissive={C.cyan} emissiveIntensity={2.2} />
        </mesh>
      ))}
    </group>
  );
}

function Vault({ still }: { still: boolean }) {
  const slabs = useRef<THREE.MeshStandardMaterial[]>([]);
  const core = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (still) return;
    const t = clock.elapsedTime;
    slabs.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = 0.25 + 0.9 * Math.max(0, Math.sin(t * 1.6 - i * 0.7));
    });
    if (core.current) core.current.rotation.y = t * 0.25;
  });
  const ys = [-0.6, -0.3, 0, 0.3, 0.6];
  return (
    <group position={[VAULT_X, 0, 0]}>
      <mesh>
        <boxGeometry args={[2.3, 2.3, 2.3]} />
        <meshStandardMaterial
          color={C.cyan}
          transparent
          opacity={0.05}
          metalness={0.2}
          roughness={0.1}
          depthWrite={false}
        />
        <Edges color={C.cyan} />
      </mesh>
      <group ref={core}>
        {ys.map((y, i) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={[1.35, 0.07, 1.35]} />
            <meshStandardMaterial
              ref={(m) => {
                if (m) slabs.current[i] = m;
              }}
              color="#0E2A33"
              emissive={C.cyan}
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
      <pointLight color={C.cyan} intensity={6} distance={6} />
      <GroundRing color={C.cyan} />
    </group>
  );
}

function Rig({ still, compact }: { still: boolean; compact: boolean }) {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = still ? 0 : clock.elapsedTime;
    const z = compact ? 15 : 8.6;
    camera.position.set(Math.sin(t * 0.12) * 1.6, 3.4 + Math.sin(t * 0.09) * 0.3, z);
    camera.lookAt(0, -0.1, 0);
  });
  return null;
}

export default function ReplicationScene3D({ active, still }: { active: boolean; still: boolean }) {
  const compact = typeof window !== 'undefined' && window.innerWidth < 640;
  const link = useMemo(
    () => [new THREE.Vector3(VAULT_X + 1.2, 0, 0), new THREE.Vector3(TARGET_X - 0.7, 0, 0)],
    [],
  );
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 3.4, compact ? 15 : 8.6], fov: 34 }}
      frameloop={active && !still ? 'always' : 'demand'}
      aria-hidden="true"
    >
      <color attach="background" args={[C.ink]} />
      <fog attach="fog" args={[C.ink, 9, 22]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 6]} intensity={1.6} />
      <directionalLight position={[-6, 2, 4]} intensity={0.6} color={C.cyan} />
      <gridHelper args={[30, 60, '#123040', '#0C1622']} position={[0, -1.4, 0]} />
      <Rig still={still} compact={compact} />
      <group position={[RACK_X, 0, 0]}>
        <Chassis accent={C.cyan} still={still} />
      </group>
      <Stream still={still} />
      <Vault still={still} />
      <Line points={link} color={C.green} lineWidth={1} dashed dashSize={0.15} gapSize={0.12} />
      <group position={[TARGET_X, 0, 0]}>
        <Chassis accent={C.green} still={still} materialize />
      </group>
      <Label
        compact={compact}
        position={[RACK_X, -2.05, 0]}
        title={compact ? 'Legacy' : 'Legacy server'}
        sub="DRS agent · block-level"
      />
      <Label
        compact={compact}
        position={[VAULT_X, -2.05, 0]}
        title={compact ? 'AWS account' : 'Your AWS account'}
        sub="staging · snapshots"
      />
      <Label
        compact={compact}
        position={[TARGET_X, -2.05, 0]}
        title={compact ? 'Recovered' : 'Recovered server'}
        sub="launched on demand"
      />
    </Canvas>
  );
}
