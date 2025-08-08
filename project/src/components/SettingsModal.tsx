import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getAvailableLanguages } from '../utils/checkTranslations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Only show languages that have complete translations for all features including the FX cards
const languages = getAvailableLanguages();

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { i18n, t } = useTranslation();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
  };

  // Animation variants for Framer Motion
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const sidebarVariants = {
    hidden: { 
      x: '100%',
      opacity: 0.8
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      x: '100%',
      opacity: 0.8,
      transition: { 
        duration: 0.25,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            className="fixed inset-0 flex justify-end z-50 gpu-accelerated"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={handleOverlayClick}
          >
            {/* Settings Sidebar */}
            <motion.aside 
              className="w-full max-w-sm h-full bg-[#111] p-6 flex flex-col gpu-accelerated"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={onClose}
                className="self-end text-gray-400 hover:text-gray-200 mb-4 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-white text-2xl font-semibold mb-6">{t('settings.language')}</h2>
              
              <div className="mb-6">
                <label htmlFor="language-select" className="block text-gray-300 mb-2">
                  {t('settings.language')}
                </label>
                <select
                  id="language-select"
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  className="block w-full bg-[#222] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16d68f] focus:border-transparent transition-shadow duration-200 border border-gray-700"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {t(lang.name)}
                    </option>
                  ))}
                </select>
              </div>
            </motion.aside>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SettingsModal;