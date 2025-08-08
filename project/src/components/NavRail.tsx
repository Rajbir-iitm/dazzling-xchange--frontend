import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UserCircle, Briefcase, BookOpen, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavRailProps {
  onOpenSettings: () => void;
}

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: Home, label: 'Home', title: 'Home' },
  { path: '/services', icon: Briefcase, label: 'Services', title: 'Services' },
  { path: '/about', icon: UserCircle, label: 'About', title: 'About' },
  { path: '/articles', icon: BookOpen, label: 'Articles', title: 'Articles' }
];

const NavRail: React.FC<NavRailProps> = React.memo(({ onOpenSettings }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === '/articles') {
      return location.pathname === path || location.pathname.startsWith('/articles/');
    }
    return location.pathname === path;
  };

  const navItemVariants = {
    initial: { width: 48 },
    hover: { width: 'auto' },
    exit: { width: 48 }
  };

  const labelVariants = {
    initial: { opacity: 0, x: -10 },
    hover: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  return (
    <>
      {/* Desktop NavRail */}
      <motion.aside 
        className="fixed left-0 top-0 h-screen bg-neutral-950 flex flex-col justify-between items-start py-6 z-50 hidden lg:flex shadow-xl border-r border-neutral-800"
        initial={{ width: 80 }}
        whileHover={{ width: 'auto' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <nav className="flex flex-col items-start space-y-2 mt-8 w-full px-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            
            return (
              <motion.div
                key={item.path}
                variants={navItemVariants}
                initial="initial"
                whileHover="hover"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onHoverStart={() => setHoveredItem(item.path)}
                onHoverEnd={() => setHoveredItem(null)}
                className="w-full"
              >
                <Link
                  to={item.path}
                  className={`
                    flex items-center h-12 px-3 rounded-lg transition-colors duration-200 
                    group relative overflow-hidden whitespace-nowrap
                    ${active 
                      ? 'bg-primary text-neutral-900 shadow-glow-primary' 
                      : 'text-neutral-400 hover:text-primary hover:bg-neutral-800'
                    }
                  `}
                  title={item.title}
                  aria-label={item.title}
                >
                  <IconComponent 
                    className={`w-6 h-6 flex-shrink-0 transition-colors duration-200`} 
                  />
                  
                  <AnimatePresence>
                    {hoveredItem === item.path && (
                      <motion.span
                        variants={labelVariants}
                        initial="initial"
                        animate="hover"
                        exit="exit"
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="ml-3 font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex flex-col items-start space-y-4 w-full px-4">
          {/* Settings Button */}
          <motion.div
            variants={navItemVariants}
            initial="initial"
            whileHover="hover"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onHoverStart={() => setHoveredItem('settings')}
            onHoverEnd={() => setHoveredItem(null)}
            className="w-full"
          >
            <button
              onClick={onOpenSettings}
              className="flex items-center h-12 px-3 rounded-lg text-neutral-400 hover:text-primary hover:bg-neutral-800 transition-colors duration-200 group relative overflow-hidden whitespace-nowrap w-full"
              title="Settings"
              aria-label="Settings"
            >
              <Settings className="w-6 h-6 flex-shrink-0 transition-colors duration-200" />
              
              <AnimatePresence>
                {hoveredItem === 'settings' && (
                  <motion.span
                    variants={labelVariants}
                    initial="initial"
                    animate="hover"
                    exit="exit"
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="ml-3 font-medium"
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          {/* Company Logo */}
          <Link 
            to="/"
            className="flex items-center justify-center w-12 h-12 mx-auto rounded-lg hover:bg-neutral-800 transition-colors duration-200 group"
            title="Home"
            aria-label="Go to Home"
          >
            <img 
              src="https://i.ibb.co/VcB3xpz1/Untitled-design-2025-07-02-T031441-104.png" 
              alt="Dazzling Xchange Logo" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </motion.aside>
      
      {/* Mobile Bottom Navigation */}
      <aside className="fixed left-0 bottom-0 w-full h-16 bg-neutral-950 flex justify-around items-center py-2 z-50 lg:hidden border-t border-neutral-800 shadow-lg">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center h-12 px-2 rounded-lg transition-colors duration-200
                ${active 
                  ? 'text-primary' 
                  : 'text-neutral-400 hover:text-primary'
                }
              `}
              aria-label={item.title}
            >
              <IconComponent className="w-6 h-6 transition-colors duration-200" />
            </Link>
          );
        })}
        
        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center justify-center h-12 px-2 rounded-lg text-neutral-400 hover:text-primary transition-colors duration-200"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6 transition-colors duration-200" />
        </button>
      </aside>
    </>
  );
});

NavRail.displayName = 'NavRail';

export default NavRail;