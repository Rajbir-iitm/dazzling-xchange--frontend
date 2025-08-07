import React from 'react';

interface Props {
  sections: { id: string; title: string }[];
  activeSection: string;
}

const FloatingTOC: React.FC<Props> = React.memo(({ sections, activeSection }) => (
  <nav
    aria-label="Table of contents"
    className="col-span-1 hidden lg:block"
  >
    {/* sticky wrapper */}
    <div className="sticky top-24 z-30">
      <div className="bg-[#111] rounded-2xl p-6 border border-gray-800 space-y-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
          Table of Contents
        </h3>
        <ul className="space-y-1">
          {sections.map(sec => (
            <li key={sec.id}>
              <a
                href={'#' + sec.id}
                className={
                  `block px-3 py-2 rounded-lg text-sm transition-all duration-200 ` +
                  (activeSection === sec.id
                    ? 'text-[#16d68f] bg-[#222] border-l-2 border-[#16d68f] pl-4'
                    : 'text-gray-300 hover:text-[#16d68f] hover:bg-[#222] hover:pl-4')
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
));

FloatingTOC.displayName = 'FloatingTOC';

export default FloatingTOC;