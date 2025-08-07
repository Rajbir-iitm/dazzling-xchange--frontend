import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import '../styles/exchange-widget.css';
import '../styles/widget-text.css';

// Lazy load the background for performance
const ExchangeBackground = lazy(() => import('./ExchangeBackground'));

// Currency symbols and their data
const currencies = [
  { symbol: '$', name: 'USD', rate: '1.00' },
  { symbol: '€', name: 'EUR', rate: '0.85' },
  { symbol: '£', name: 'GBP', rate: '0.73' },
  { symbol: '¥', name: 'JPY', rate: '110.25' },
  { symbol: '₹', name: 'INR', rate: '74.50' },
  { symbol: '¥', name: 'CNY', rate: '6.45' },
  { symbol: 'C$', name: 'CAD', rate: '1.25' },
  { symbol: 'A$', name: 'AUD', rate: '1.35' },
];

// Exchange rate pairs for ticker with full names
const exchangePairs = [
  { from: 'USD', to: 'EUR', fromName: 'US Dollar', toName: 'Euro', rate: 0.8534, change: '+0.12%', changeValue: 0.12 },
  { from: 'GBP', to: 'USD', fromName: 'British Pound', toName: 'US Dollar', rate: 1.2654, change: '-0.08%', changeValue: -0.08 },
  { from: 'USD', to: 'JPY', fromName: 'US Dollar', toName: 'Japanese Yen', rate: 110.25, change: '+0.25%', changeValue: 0.25 },
  { from: 'EUR', to: 'GBP', fromName: 'Euro', toName: 'British Pound', rate: 0.8642, change: '+0.05%', changeValue: 0.05 },
  { from: 'USD', to: 'INR', fromName: 'US Dollar', toName: 'Indian Rupee', rate: 74.50, change: '-0.15%', changeValue: -0.15 },
  { from: 'USD', to: 'CAD', fromName: 'US Dollar', toName: 'Canadian Dollar', rate: 1.2534, change: '+0.18%', changeValue: 0.18 },
];

// SVG Exchange Icon Component
const SwapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M7 16L3 12M3 12L7 8M3 12H21M17 8L21 12M21 12L17 16M21 12H3" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Tooltip Component
const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-neutral-900 text-white text-sm rounded-lg border border-primary/30 whitespace-nowrap z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {content}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-900"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CurrencyAnimation: React.FC = () => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [animateRates, setAnimateRates] = useState(false);
  const [previousRate, setPreviousRate] = useState(0);

  // Initialize particles engine
  const particlesInit = React.useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  // Cycle through exchange pairs
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousRate(exchangePairs[currentPairIndex].rate);
      setCurrentPairIndex((prev) => (prev + 1) % exchangePairs.length);
      setAnimateRates(true);
      setTimeout(() => setAnimateRates(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPairIndex]);

  const currentPair = exchangePairs[currentPairIndex];
  const isPositiveChange = currentPair.changeValue > 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Starfield-Style Glowing Dots Background */}
      <Particles
        className="absolute inset-0 -z-20"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 25 },
            size: { value: { min: 1, max: 3 } },
            color: { value: "#10B981" },
            move: { 
              enable: true, 
              speed: 0.2, 
              direction: "none", 
              outModes: { default: "bounce" } 
            },
            opacity: {
              value: 0.3,
              animation: { 
                enable: true, 
                speed: 0.5, 
                minimumValue: 0.1, 
                sync: false 
              }
            }
          },
          detectRetina: true,
          fpsLimit: 60
        }}
      />
      
      {/* Enhanced Background with Three.js, Particles, and Parallax */}
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />}>
        <ExchangeBackground />
      </Suspense>
      {/* Enhanced Central Exchange Rate Display - Glassmorphic with Wrapper */}
      <div className="exchange-widget-wrapper">
        <motion.div 
          className="exchange-widget relative z-10 text-center backdrop-blur-xl border border-primary/25 rounded-3xl group cursor-pointer"
        style={{
          backgroundColor: 'rgba(20,27,39,0.6)',
          boxShadow: 'inset 0 0 20px rgba(16,185,129,0.15)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: 'inset 0 0 30px rgba(16,185,129,0.25)',
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        aria-label={`Live exchange rate: ${currentPair.from} to ${currentPair.to} at ${currentPair.rate.toFixed(4)}, ${currentPair.change} today`}
      >
        <motion.div
          className="widget-header text-neutral-400 text-base md:text-lg font-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          LIVE EXCHANGE RATE
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPairIndex}
            className="flex items-center justify-center space-x-5 md:space-x-7 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Tooltip content={`${currentPair.fromName} ↔ ${currentPair.toName}`}>
              <div className="currency-pair flex items-center space-x-5 md:space-x-7 cursor-help">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-primary tracking-wide">
                  {currentPair.from}
                </span>
                <motion.div
                  className="text-primary text-3xl md:text-4xl swap-icon"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                >
                  <SwapIcon className="w-10 h-10 md:w-12 md:h-12" />
                </motion.div>
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-primary tracking-wide">
                  {currentPair.to}
                </span>
              </div>
            </Tooltip>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`rate-${currentPairIndex}`}
            className="exchange-rate text-primary text-4xl sm:text-5xl md:text-6xl font-extrabold font-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <CountUp 
              end={currentPair.rate} 
              decimals={4} 
              duration={1.2} 
              separator="," 
              preserveValue
            />
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          key={`delta-${currentPairIndex}`}
          className={`rate-change text-2xl md:text-3xl font-primary font-semibold ${
            isPositiveChange 
              ? 'delta-positive text-green-400' 
              : 'delta-negative text-red-400'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {currentPair.change} today
        </motion.div>
        </motion.div>
      </div>

      {/* Legacy floating symbols removed - now handled by ExchangeBackground parallax */}

      {/* Subtle accent flow lines - reduced for performance */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={`flow-${index}`}
          className="absolute w-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          style={{
            height: '120px',
            left: '50%',
            top: '50%',
            transformOrigin: 'center bottom',
            rotate: `${index * 120}deg`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        />
      ))}

      {/* Minimal orbiting accents - performance optimized */}
      {[...Array(6)].map((_, index) => {
        const angle = (index / 6) * 2 * Math.PI;
        const radius = 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`accent-${index}`}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [x, x * 1.05, x],
              y: [y, y * 1.05, y],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          />
        );
      })}

      {/* Background rings and pulses now handled by ExchangeBackground Three.js neon rings */}

      {/* Conversion arrows simplified for performance */}
      <motion.div
        className="absolute text-primary/30 text-lg"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          rotate: 360,
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        ⟲
      </motion.div>

      {/* Accessibility description */}
      <span className="sr-only">
        Animated currency exchange visualization showing floating currency symbols, live exchange rates, and money transfer flows
      </span>
    </div>
  );
};

export default React.memo(CurrencyAnimation);