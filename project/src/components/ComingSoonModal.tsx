import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = React.memo(({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dark overlay - matches SalesModal */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={handleOverlayClick} />
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div 
          className="bg-[#111] rounded-2xl w-full max-w-md mx-4 p-6 lg:p-8 shadow-[0_8px_16px_rgba(0,0,0,0.5)] relative"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-neutral-700 rounded-full p-2 transition-all duration-150 z-50 focus:outline-none focus:ring-2 focus:ring-primary active:scale-95"
            aria-label={t('aria.closeModal')}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#16d68f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">{t('comingSoon.title')}</h2>
              <p className="text-gray-300">
                {t('comingSoon.desc')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#222] rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{t('comingSoon.expectTitle')}</h3>
                <ul className="text-gray-300 text-sm space-y-1 text-left">
                  <li>• {t('comingSoon.points.instant')}</li>
                  <li>• {t('comingSoon.points.rates')}</li>
                  <li>• {t('comingSoon.points.wallet')}</li>
                  <li>• {t('comingSoon.points.multi')}</li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#16d68f] text-black rounded-lg px-4 py-3 font-medium hover:bg-[#14c07f] transition-colors duration-200"
              >
                {t('actions.gotIt')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

ComingSoonModal.displayName = 'ComingSoonModal';

export default ComingSoonModal;