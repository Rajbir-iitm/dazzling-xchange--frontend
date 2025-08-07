import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { useInView } from 'react-intersection-observer';

// Fallback placeholder component with CSS-only globe
const GlobePlaceholder: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* CSS Globe with rotating animation */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 animate-pulse" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-inner">
        {/* Grid lines */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
        <div className="absolute inset-4 rounded-full border border-primary/5" />
        <div className="absolute inset-8 rounded-full border border-primary/5" />
        
        {/* Rotating element to simulate globe rotation */}
        <div className="absolute inset-0 rounded-full border-l border-primary/20 animate-spin [animation-duration:20s]" />
        <div className="absolute inset-0 rounded-full border-r border-accent/10 animate-spin [animation-duration:30s] [animation-direction:reverse]" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl animate-pulse-subtle" />
    </div>
  </div>
);

// Simple controls component
const Controls: React.FC = () => {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    controls.autoRotateSpeed = 0.3;
    controls.minPolarAngle = Math.PI * 0.3;
    controls.maxPolarAngle = Math.PI * 0.7;
    
    return () => controls.dispose();
  }, [camera, gl]);
  
  return null;
};

// 3D Globe mesh component
const Globe3D: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  // Load texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      'https://unpkg.com/three-globe/example/img/earth-dark.jpg',
      (loadedTexture) => {
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.warn('Failed to load globe texture:', error);
        // Use a simple color as fallback
      }
    );
  }, []);

  // Auto-rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; // Slow rotation
    }
  });

  // Note: Reduced motion preference is handled in OrbitControls autoRotate prop

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        color={texture ? undefined : '#00D084'}
        roughness={0.8}
        metalness={0.1}
        emissive={new THREE.Color('#001a0f')}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

// Error boundary for WebGL failures
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('WebGL Globe failed to render:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main HeroGlobe component
const HeroGlobe: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px'
  });

  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebGLSupported(!!gl);
  }, []);

  // Don't render 3D canvas until in view and WebGL is supported
  if (!inView || webGLSupported === false) {
    return (
      <div ref={ref} className="w-full h-full">
        <GlobePlaceholder />
      </div>
    );
  }

  if (webGLSupported === null) {
    // Still checking WebGL support
    return (
      <div ref={ref} className="w-full h-full">
        <GlobePlaceholder />
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full h-full">
      <WebGLErrorBoundary fallback={<GlobePlaceholder />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: 'transparent' }}
          dpr={Math.min(window.devicePixelRatio, 2)} // Limit DPR for performance
          performance={{ min: 0.5 }} // Adaptive performance
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D084" />
            
            {/* Globe */}
            <Globe3D />
            
            {/* Simple controls without drei dependency */}
            <Controls />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
      
      {/* Accessibility description */}
      <span className="sr-only">
        Animated 3D earth globe showing global currency exchange visualization
      </span>
    </div>
  );
};

export default React.memo(HeroGlobe);