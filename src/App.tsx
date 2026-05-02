import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Earth } from './components/Earth';
import { AsteroidField } from './components/AsteroidField';
import { Sidebar } from './components/Sidebar';
import { useNeoData } from './hooks/useNeoData';
import type { AsteroidData } from './types';
import './App.css';

function App() {
  const { data, loading, error } = useNeoData();
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidData | null>(null);

  return (
    <div className="app-container">
      {/* Background ambient gradient */}
      <div className="bg-gradient"></div>
      
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <Sidebar 
        asteroid={selectedAsteroid} 
        loading={loading} 
        count={data.length} 
      />

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 5, 5]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#60a5fa" />
          
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Earth />
            <AsteroidField 
              data={data} 
              onSelect={setSelectedAsteroid} 
              selectedId={selectedAsteroid?.id || null} 
            />
            {/* Post-processing effects for premium look */}
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            </EffectComposer>
          </Suspense>
          
          <OrbitControls 
            enablePan={false}
            minDistance={1.5}
            maxDistance={8}
            autoRotate={!selectedAsteroid}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      {/* Overlay to show hint when unselected */}
      {!selectedAsteroid && !loading && (
        <div className="hint-overlay">
          <div className="hint-pill glass-panel">
            Drag to rotate • Scroll to zoom • Click an anomaly
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
