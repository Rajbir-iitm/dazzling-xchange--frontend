import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Neon Rings Component for Three.js
const NeonRings: React.FC = () => {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const middleRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.z += delta * 0.05;
    }
    if (outerRef.current) {
      outerRef.current.rotation.z -= delta * 0.03;
    }
    if (middleRef.current) {
      middleRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <>
      {/* Inner Ring */}
      <mesh ref={innerRef} position={[0, 0, -2]}>
        <ringGeometry args={[1.2, 1.25, 64]} />
        <meshBasicMaterial 
          color="#10B981" 
          transparent 
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Middle Ring */}
      <mesh ref={middleRef} position={[0, 0, -1.5]}>
        <ringGeometry args={[1.35, 1.37, 64]} />
        <meshBasicMaterial 
          color="#34D399" 
          transparent 
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Outer Ring */}
      <mesh ref={outerRef} position={[0, 0, -1]}>
        <ringGeometry args={[1.5, 1.55, 64]} />
        <meshBasicMaterial 
          color="#10B981" 
          transparent 
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ambient lighting for glow effect */}
      <ambientLight intensity={0.2} color="#10B981" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#10B981" />
    </>
  );
};

// Enhanced Particle System
const EnhancedParticles: React.FC = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.1,
    opacity: Math.random() * 0.3 + 0.1,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

// Parallax Currency Icons
const ParallaxCurrencyIcons: React.FC = () => {
  const currencies = [
    { symbol: '¥', color: '#10B981', size: 'text-3xl' },
    { symbol: '€', color: '#34D399', size: 'text-4xl' },
    { symbol: '£', color: '#6EE7B7', size: 'text-2xl' },
    { symbol: '$', color: '#10B981', size: 'text-5xl' },
    { symbol: '₹', color: '#059669', size: 'text-3xl' },
    { symbol: 'C$', color: '#34D399', size: 'text-2xl' },
    { symbol: '¥', color: '#10B981', size: 'text-3xl' },
    { symbol: '₩', color: '#6EE7B7', size: 'text-4xl' },
  ];

  return (
    <div className="absolute inset-0 -z-10">
      {currencies.map((currency, index) => {
        const angle = (index / currencies.length) * 2 * Math.PI;
        const radius = 200 + Math.random() * 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <Parallax 
            key={`${currency.symbol}-${index}`}
            speed={index % 2 === 0 ? -3 : 3}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <motion.span
              className={`${currency.size} font-bold select-none opacity-20`}
              style={{ color: currency.color }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.3,
              }}
            >
              {currency.symbol}
            </motion.span>
          </Parallax>
        );
      })}
    </div>
  );
};

// WebGL Detection and Error Boundary
const WebGLDetector: React.FC<{ children: React.ReactNode; fallback: React.ReactNode }> = ({ 
  children, 
  fallback 
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (error) {
      setHasWebGL(false);
    }
  }, []);

  if (hasWebGL === null) {
    return <div className="animate-pulse">{fallback}</div>;
  }

  return hasWebGL ? <>{children}</> : <>{fallback}</>;
};

// Static SVG Fallback for low-end devices
const StaticBackgroundFallback: React.FC = () => (
  <div className="absolute inset-0 -z-10">
    <svg 
      className="w-full h-full opacity-10" 
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
          <stop offset="70%" stopColor="#10B981" stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="400" cy="300" r="200" fill="url(#bg-gradient)" />
      <circle cx="400" cy="300" r="150" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.2" />
      <circle cx="400" cy="300" r="100" fill="none" stroke="#34D399" strokeWidth="1" opacity="0.15" />
    </svg>
  </div>
);

// Main Exchange Background Component
const ExchangeBackground: React.FC = () => {
  return (
    <ParallaxProvider>
      <div className="absolute inset-0 -z-30">
        {/* Enhanced Particle Field */}
        <EnhancedParticles />
        
        {/* Parallax Currency Icons */}
        <ParallaxCurrencyIcons />
        
        {/* Three.js Neon Rings with WebGL Detection */}
        <WebGLDetector fallback={<StaticBackgroundFallback />}>
          <Suspense fallback={<StaticBackgroundFallback />}>
            <div className="absolute inset-0 -z-10">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: 'transparent' }}
                dpr={Math.min(window.devicePixelRatio, 2)}
                performance={{ min: 0.3 }}
                gl={{ 
                  antialias: false, // Disable for performance
                  alpha: true,
                  powerPreference: 'default'
                }}
              >
                <Suspense fallback={null}>
                  <NeonRings />
                </Suspense>
              </Canvas>
            </div>
          </Suspense>
        </WebGLDetector>
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 -z-5 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default React.memo(ExchangeBackground);