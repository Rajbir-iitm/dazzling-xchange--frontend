import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

function SimpleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  const handleLanguageSelect = (language: typeof LANGUAGES[0]) => {
    setSelectedLang(language);
    setIsOpen(false);

    if (language.code === 'en') {
      // Stay on current page for English
      return;
    }

    // Open Google Translate in same tab for instant translation
    const currentUrl = encodeURIComponent(window.location.href);
    const translateUrl = `https://translate.google.com/translate?sl=en&tl=${language.code}&u=${currentUrl}`;
    window.location.href = translateUrl;
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-primary to-accent text-neutral-900 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Translate Page"
        >
          <span className="text-xl">{selectedLang.flag}</span>
          <Globe className="w-5 h-5" />
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-3 w-72 bg-neutral-900/95 backdrop-blur-md rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden"
            >
              <div className="p-3">
                <div className="text-xs text-neutral-400 px-3 py-2 font-medium uppercase tracking-wide">
                  Select Language
                </div>
                <div className="space-y-1 max-h-80 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 text-left ${
                        selectedLang.code === lang.code
                          ? 'bg-primary/20 text-primary'
                          : 'text-neutral-200 hover:bg-neutral-800/80 hover:text-white'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                      {selectedLang.code === lang.code && (
                        <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default SimpleTranslate;
