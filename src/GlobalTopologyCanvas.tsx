import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 1. The Core Infrastructure Globe
const Globe = () => (
  <Sphere args={[2, 48, 48]}>
    <meshStandardMaterial 
      color="#0B0F17" 
      roughness={0.7} 
      metalness={0.9} 
      wireframe={true} 
      transparent 
      opacity={0.25} 
    />
  </Sphere>
);

// 2. Animated Replication Stream (eBPF Block Transfer)
const DataConduit = ({ 
  start, 
  end, 
  color, 
  speed = 0.6,
  jitter = false
}: { 
  start: THREE.Vector3; 
  end: THREE.Vector3; 
  color: string; 
  speed?: number;
  jitter?: boolean;
}) => {
  // Generate a smooth arc between the two cloud regions
  const curve = useMemo(() => {
    const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(2.5);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const particleRef = useRef<THREE.Mesh>(null);

  // Animate a telemetry packet along the arc at 60fps
  useFrame(({ clock }) => {
    if (!particleRef.current) return;
    const time = (clock.getElapsedTime() * speed) % 1;
    const position = curve.getPoint(time);
    
    if (jitter) {
      // Simulate packet turbulence / jitter
      position.x += (Math.random() - 0.5) * 0.08;
      position.y += (Math.random() - 0.5) * 0.08;
    }
    
    particleRef.current.position.copy(position);
  });

  return (
    <group>
      <Line points={points} color={color} lineWidth={1.5} transparent opacity={0.4} />
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
};

// 3. Principal Architect Canvas Implementation
export default function GlobalTopologyCanvas({ 
  status = 'ACTIVE_SYNC',
  targetRegion = 'gcp-us-central1',
  chaosActive = false 
}: { 
  status?: string;
  targetRegion?: string;
  chaosActive?: boolean;
}) {
  // Geographically mapped coordinates for AWS us-east-1 and variable targets
  const awsNode = useMemo(() => new THREE.Vector3(1.2, 1.0, 1.2), []); 
  
  const targetNode = useMemo(() => {
    switch (targetRegion) {
      case 'aws-us-west-2':
        return new THREE.Vector3(-1.8, 0.8, -0.6);
      case 'azure-eastus2':
        return new THREE.Vector3(1.1, 0.8, 1.4);
      case 'gcp-us-central1':
      default:
        return new THREE.Vector3(-1.0, 1.2, 1.4);
    }
  }, [targetRegion]);

  // Dynamic visual states based on the failover state machine & chaos injection
  const { conduitColor, conduitSpeed, statusLabel } = useMemo(() => {
    if (chaosActive) {
      return {
        conduitColor: '#FF3B30',
        conduitSpeed: 0.9,
        statusLabel: 'CHAOS INJECTED • Network Jitter & Dropped Packets'
      };
    }

    switch (status) {
      case 'ACTIVE_SYNC':
        return { 
          conduitColor: '#00F0FF', 
          conduitSpeed: 0.6, 
          statusLabel: 'Encrypted eBPF Replication Active' 
        };
      case 'TARGET_SECURED':
        return { 
          conduitColor: '#00FF9D', 
          conduitSpeed: 0.3, 
          statusLabel: 'Failover Secured • Target Active' 
        };
      default:
        // Failover in progress (Replicating, Hydrating, Rerouting)
        return { 
          conduitColor: '#FFB800', 
          conduitSpeed: 1.8, 
          statusLabel: 'Hydrating Target & Rerouting Traffic...' 
        };
    }
  }, [status, chaosActive]);

  const targetLabel = useMemo(() => {
    switch (targetRegion) {
      case 'aws-us-west-2': return 'AWS us-west-2 (Oregon)';
      case 'azure-eastus2': return 'Azure East US 2 (Virginia)';
      case 'gcp-us-central1':
      default: return 'GCP us-central1 (Iowa)';
    }
  }, [targetRegion]);

  return (
    <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden border border-white/10 bg-[#05070B]/80 relative shadow-2xl backdrop-blur-xl mb-6">
      {/* HUD Header Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div 
          className="w-2.5 h-2.5 rounded-full animate-pulse transition-colors duration-500 shadow-lg"
          style={{ backgroundColor: conduitColor, boxShadow: `0 0 10px ${conduitColor}` }}
        />
        <span 
          className="text-xs font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 transition-colors duration-500"
          style={{ color: conduitColor }}
        >
          Tunnel: CoreSite/AWS us-east-1 ➔ {targetLabel} • {statusLabel}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-lg border border-white/5">
        <span>Three.js 60FPS</span>
        <span>•</span>
        <span>Interactive Drag / Orbit</span>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#00FF9D" />
        
        <Globe />
        
        {/* AWS Primary Node (us-east-1) */}
        <mesh position={awsNode}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#00F0FF" toneMapped={false} />
        </mesh>
        
        {/* Dynamic Target Node */}
        <mesh position={targetNode}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial 
            color={chaosActive ? '#FF3B30' : status === 'TARGET_SECURED' ? '#00FF9D' : '#FFB800'} 
            toneMapped={false} 
          />
        </mesh>
        
        <DataConduit 
          start={awsNode} 
          end={targetNode} 
          color={conduitColor} 
          speed={conduitSpeed}
          jitter={chaosActive}
        />
        
        {/* Smooth Orbit Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
