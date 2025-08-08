import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  sections: { id: string; title: string }[];
  activeSection: string;
}

const FloatingTOC: React.FC<Props> = React.memo(({ sections, activeSection }) => {
  const { t } = useTranslation();
  return (
    <nav
      aria-label={t('toc.aria')}
      className="col-span-1 hidden lg:block"
    >
      {/* sticky wrapper */}
      <div className="sticky top-24 z-30">
        <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700 space-y-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <h3 className="text-secondary font-semibold font-primary mb-4 text-sm uppercase tracking-wide">
            {t('toc.title')}
          </h3>
          <ul className="space-y-1">
            {sections.map(sec => (
              <li key={sec.id}>
                <a
                  href={'#' + sec.id}
                  className={
                    `block px-3 py-2 rounded-lg text-sm font-primary transition-all duration-200 ` +
                    (activeSection === sec.id
                      ? 'text-primary bg-neutral-700 border-l-2 border-primary pl-4'
                      : 'text-neutral-300 hover:text-primary hover:bg-neutral-700 hover:pl-4')
                  }
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});

FloatingTOC.displayName = 'FloatingTOC';

export default FloatingTOC;