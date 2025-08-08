import { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Popular languages with native names and flags
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

function AutoTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // Add Google Translate script
    const addGoogleTranslateScript = () => {
      // Check if script already exists
      if (document.getElementById('google-translate-script')) return;

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.getElementsByTagName('head')[0].appendChild(script);

      // Initialize Google Translate
      (window as any).googleTranslateElementInit = function() {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false,
          includedLanguages: 'ar,de,es,fr,hi,it,ja,ko,pt,ru,zh',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      };
    };

    // Add custom CSS to hide Google branding and adjust styles
    const addCustomCSS = () => {
      if (document.getElementById('google-translate-css')) return;

      const css = document.createElement('style');
      css.id = 'google-translate-css';
      css.innerHTML = `
        #google_translate_element {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }
        
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        
        body {
          top: 0px !important;
        }
        
        .goog-te-balloon-frame {
          display: none !important;
        }
        
        .goog-logo-link {
          display: none !important;
        }
        
        .goog-te-gadget {
          display: none !important;
        }
        
        .goog-te-ftab {
          display: none !important;
        }
        
        #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
        }
        
        .skiptranslate {
          display: none !important;
        }
      `;
      document.head.appendChild(css);
    };

    addGoogleTranslateScript();
    addCustomCSS();
  }, []);

  const translatePage = (langCode: string) => {
    if (langCode === 'en') {
      // Reload page to restore original
      window.location.reload();
      return;
    }

    // Try multiple methods to trigger translation
    const triggerTranslation = () => {
      // Method 1: Try to find and use the select element
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change'));
        return true;
      }

      // Method 2: Direct API call if available
      if ((window as any).google?.translate?.TranslateElement) {
        try {
          const translateElement = new (window as any).google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: langCode,
            autoDisplay: false,
          });
          return true;
        } catch (e) {
          console.log('Direct API method failed:', e);
        }
      }

      return false;
    };

    // Wait for Google Translate to be ready and then translate
    let attempts = 0;
    const maxAttempts = 50;
    const waitAndTranslate = () => {
      if (triggerTranslation()) {
        console.log(`Successfully triggered translation to ${langCode}`);
        return;
      }

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(waitAndTranslate, 100);
      } else {
        console.log('Translation failed - Google Translate not ready');
        // Fallback: redirect to Google Translate
        const currentUrl = encodeURIComponent(window.location.href);
        window.open(`https://translate.google.com/translate?sl=en&tl=${langCode}&u=${currentUrl}`, '_blank');
      }
    };

    waitAndTranslate();
  };

  const handleLanguageSelect = (language: typeof LANGUAGES[0]) => {
    if (language.code === selectedLang.code) return;
    
    setSelectedLang(language);
    setIsTranslating(true);
    setIsOpen(false);

    console.log(`Translating to ${language.name} (${language.code})`);
    translatePage(language.code);

    // Reset translating state
    setTimeout(() => setIsTranslating(false), 3000);
  };

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element"></div>
      
      {/* Floating Language Picker */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: 'backOut' }}
      >
        <div className="relative">
          {/* Main Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            disabled={isTranslating}
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-neutral-900 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 disabled:opacity-70"
            whileHover={{ scale: isTranslating ? 1 : 1.05 }}
            whileTap={{ scale: isTranslating ? 1 : 0.95 }}
            title="Translate Page"
          >
            <div className="flex items-center space-x-2">
              {isTranslating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5"
                >
                  <Globe className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  <span className="text-xl">{selectedLang.flag}</span>
                  <Globe className="w-5 h-5" />
                </>
              )}
            </div>
            
            {!isTranslating && (
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            )}

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>

          {/* Language Dropdown */}
          <AnimatePresence>
            {isOpen && !isTranslating && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute bottom-full right-0 mb-3 w-72 bg-neutral-900/95 backdrop-blur-md rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden"
              >
                <div className="p-3">
                  <div className="text-xs text-neutral-400 px-3 py-2 font-medium uppercase tracking-wide">
                    Select Language
                  </div>
                  <div className="grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang)}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 text-left ${
                          selectedLang.code === lang.code
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'text-neutral-200 hover:bg-neutral-800/80 hover:text-white'
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium flex-1">{lang.name}</span>
                        {selectedLang.code === lang.code && (
                          <motion.div
                            layoutId="activeLanguage"
                            className="w-2 h-2 bg-primary rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Translation Status */}
          <AnimatePresence>
            {isTranslating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-full right-0 mb-3 bg-neutral-900 text-white px-4 py-2 rounded-lg shadow-lg border border-neutral-700"
              >
                <div className="text-sm font-medium">
                  Translating to {selectedLang.name}...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(22, 214, 143, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(22, 214, 143, 0.7);
        }
      `}</style>
    </>
  );
}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(22, 214, 143, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(22, 214, 143, 0.7);
        }
      `}</style>
    </>
  );
}

export default AutoTranslate;
