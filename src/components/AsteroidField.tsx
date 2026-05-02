import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { AsteroidData } from '../types';

interface AsteroidFieldProps {
  data: AsteroidData[];
  onSelect: (asteroid: AsteroidData) => void;
  selectedId: string | null;
}

const Asteroid = ({ 
  data, 
  onSelect, 
  isSelected 
}: { 
  data: AsteroidData; 
  onSelect: (a: AsteroidData) => void; 
  isSelected: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Convert lat/lng/alt to spherical coordinates to Cartesian
  const position = useMemo(() => {
    const r = data.altitude + 1; // Earth radius is 1
    const phi = (90 - data.lat) * (Math.PI / 180);
    const theta = (data.lng + 180) * (Math.PI / 180);
    
    const x = -(r * Math.sin(phi) * Math.cos(theta));
    const z = r * Math.sin(phi) * Math.sin(theta);
    const y = r * Math.cos(phi);
    
    return new THREE.Vector3(x, y, z);
  }, [data]);

  // Random rotation speed for orbit
  const orbitSpeed = useMemo(() => (Math.random() * 0.2 + 0.1) * (Math.random() > 0.5 ? 1 : -1), []);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  // Parent group reference for orbiting
  const groupRef = useRef<THREE.Group>(null);

  const currentAngle = useRef(initialAngle);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Pause orbit if hovered or selected to make it easier to click and read
      if (!hovered && !isSelected) {
        currentAngle.current += delta * orbitSpeed;
      }
      groupRef.current.rotation.y = currentAngle.current;
    }
    if (meshRef.current) {
      // Spin the asteroid itself
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
      
      // Pulse scale if selected
      if (isSelected) {
        const scale = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.2;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const baseSize = Math.max(data.estimatedDiameterMax * 0.05, 0.02); // scale down size for visual
  const color = data.isHazardous ? '#ef4444' : '#4ade80'; // red if hazardous, else green
  const emissiveColor = data.isHazardous ? '#991b1b' : '#166534';

  const [hovered, setHovered] = useState(false);

  // Generate irregular scale to make it look like a real asteroid rock
  const randomScale = useMemo(() => [
    1 + Math.random() * 0.5,
    0.8 + Math.random() * 0.4,
    1 + Math.random() * 0.5,
  ] as [number, number, number], []);

  return (
    <group ref={groupRef}>
      <group position={position}>
        <mesh ref={meshRef} scale={randomScale}>
          <dodecahedronGeometry args={[baseSize * (hovered || isSelected ? 1.5 : 1), 1]} />
          <meshStandardMaterial 
            color="#6b7280" 
            roughness={0.9}
            metalness={0.2}
            bumpScale={0.02}
          />
        </mesh>
        
        {/* Invisible larger hit area for easier clicking */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect(data);
          }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        >
          <sphereGeometry args={[baseSize * 6, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Glow effect */}
        {(hovered || isSelected) && (
          <Sphere args={[baseSize * 2.5, 16, 16]}>
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.3} 
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </Sphere>
        )}
        
        {/* Label for selected */}
        {isSelected && (
          <Html distanceFactor={15} center>
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(12px)',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              border: '1px solid rgba(255,255,255,0.2)',
              whiteSpace: 'nowrap',
              fontWeight: 500,
              pointerEvents: 'none',
              transform: 'translateY(-1.5rem)'
            }}>
              {data.name}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

export const AsteroidField = ({ data, onSelect, selectedId }: AsteroidFieldProps) => {
  return (
    <group>
      {data.map((asteroid) => (
        <Asteroid 
          key={asteroid.id} 
          data={asteroid} 
          onSelect={onSelect} 
          isSelected={selectedId === asteroid.id} 
        />
      ))}
    </group>
  );
};
