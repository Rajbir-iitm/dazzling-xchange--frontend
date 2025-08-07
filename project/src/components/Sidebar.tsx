import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UserCircle, Briefcase, BookOpen, Settings } from 'lucide-react';

interface SidebarProps {
  onOpenSettings: () => void;
}

function Sidebar({ onOpenSettings }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 w-20 h-screen bg-black flex flex-col justify-between items-center py-6 z-50 lg:flex hidden">
        <nav className="flex flex-col items-center space-y-8 mt-8">
          {/* Home */}
          <Link
            to="/"
            className="icon-btn group block w-12 h-12 flex items-center justify-center"
            title="Home"
            aria-label="Home"
          >
            <Home 
              className={`w-6 h-6 transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-[#16d68f]' 
                  : 'text-white group-hover:text-[#16d68f]'
              }`} 
            />
          </Link>

          {/* About */}
          <Link
            to="/about"
            className="icon-btn group block w-12 h-12 flex items-center justify-center"
            title="About"
            aria-label="About"
          >
            <UserCircle 
              className={`w-6 h-6 transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-[#16d68f]' 
                  : 'text-white group-hover:text-[#16d68f]'
              }`} 
            />
          </Link>

          {/* Services */}
          <Link
            to="/services"
            className="icon-btn group block w-12 h-12 flex items-center justify-center"
            title="Services"
            aria-label="Services"
          >
            <Briefcase 
              className={`w-6 h-6 transition-colors duration-200 ${
                isActive('/services') 
                  ? 'text-[#16d68f]' 
                  : 'text-white group-hover:text-[#16d68f]'
              }`} 
            />
          </Link>

          {/* Articles */}
          <Link
            to="/articles"
            className="icon-btn group block w-12 h-12 flex items-center justify-center"
            title="Articles"
            aria-label="Articles"
          >
            <BookOpen 
              className={`w-6 h-6 transition-colors duration-200 ${
                isActive('/articles') || location.pathname.startsWith('/articles/')
                  ? 'text-[#16d68f]' 
                  : 'text-white group-hover:text-[#16d68f]'
              }`} 
            />
          </Link>
        </nav>

        <div className="flex flex-col items-center space-y-6">
          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="icon-btn group block w-12 h-12 flex items-center justify-center"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6 text-white group-hover:text-[#16d68f] transition-colors duration-200 bg-transparent" />
          </button>

          {/* Company logo */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="https://i.ibb.co/VcB3xpz1/Untitled-design-2025-07-02-T031441-104.png" 
              alt="Dazzling Xchange Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>
      </aside>
      
      {/* Mobile Sidebar - Always visible when cropped */}
      <aside className="fixed left-0 bottom-0 w-full h-16 bg-black flex justify-around items-center py-2 z-50 lg:hidden border-t border-gray-800 overflow-hidden">
        <Link
          to="/"
          className="icon-btn group flex flex-col items-center justify-center bg-black"
          aria-label="Home"
        >
          <Home 
            className={`w-6 h-6 transition-colors duration-200 bg-transparent ${
              isActive('/') 
                ? 'text-[#16d68f]' 
                : 'text-white group-hover:text-[#16d68f]'
            }`} 
          />
        </Link>
        
        <Link
          to="/about"
          className="icon-btn group flex flex-col items-center justify-center bg-black"
          aria-label="About"
        >
          <UserCircle 
            className={`w-6 h-6 transition-colors duration-200 bg-transparent ${
              isActive('/about') 
                ? 'text-[#16d68f]' 
                : 'text-white group-hover:text-[#16d68f]'
            }`} 
          />
        </Link>
        
        <Link
          to="/services"
          className="icon-btn group flex flex-col items-center justify-center bg-black"
          aria-label="Services"
        >
          <Briefcase 
            className={`w-6 h-6 transition-colors duration-200 bg-transparent ${
              isActive('/services') 
                ? 'text-[#16d68f]' 
                : 'text-white group-hover:text-[#16d68f]'
            }`} 
          />
        </Link>
        
        <Link
          to="/articles"
          className="icon-btn group flex flex-col items-center justify-center bg-black"
          aria-label="Articles"
        >
          <BookOpen 
            className={`w-6 h-6 transition-colors duration-200 bg-transparent ${
              isActive('/articles') || location.pathname.startsWith('/articles/')
                ? 'text-[#16d68f]' 
                : 'text-white group-hover:text-[#16d68f]'
            }`} 
          />
        </Link>
        
        <button
          onClick={onOpenSettings}
          className="icon-btn group flex flex-col items-center justify-center bg-black"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6 text-white group-hover:text-[#16d68f] transition-colors duration-200 bg-transparent" />
        </button>
      </aside>
    </>
  );
}

export default Sidebar;