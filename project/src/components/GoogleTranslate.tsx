import { useEffect } from 'react';

type Props = {
  containerId?: string;
  inline?: boolean;
  className?: string;
};

// Lightweight Google Translate widget loader
// Can render fixed floating widget or inline inside a provided container.
function GoogleTranslate({ containerId = 'google_translate_element', inline = false, className }: Props) {
  useEffect(() => {
    const w = window as any;

    w.__gtContainers = w.__gtContainers || new Set<string>();
    w.__gtContainers.add(containerId);

    const createFor = (id: string) => {
      if (!(w.google && w.google.translate)) return;
      try {
        // Avoid duplicate mounting by checking if container already has the gadget
        const container = document.getElementById(id);
        if (!container) return;
        const exists = container.querySelector('.goog-te-gadget');
        if (exists) return;
        new w.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
            layout: w.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          id
        );
      } catch (e) {
        // no-op
      }
    };

    // Idempotent script injection
    if (!w.__googleTranslateLoaderAdded) {
      w.__googleTranslateLoaderAdded = true;
      w.googleTranslateElementInit = function googleTranslateElementInit() {
        if (w.__gtContainers) {
          (w.__gtContainers as Set<string>).forEach((id: string) => createFor(id));
        } else {
          createFor(containerId);
        }
      };
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script already loaded, try to mount into this container too
      if (w.google && w.google.translate) {
        createFor(containerId);
      } else if (typeof w.googleTranslateElementInit === 'function') {
        w.googleTranslateElementInit();
      }
    }
  }, [containerId]);

  if (inline) {
    return <div id={containerId} className={className} />;
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: '12px',
        bottom: '12px',
        zIndex: 60,
        background: 'rgba(17,17,17,0.9)',
        border: '1px solid rgba(64,64,64,0.6)',
        borderRadius: '12px',
        padding: '6px 10px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.4)'
      }}
    >
      <div id={containerId} style={{ color: '#fff' }} />
    </div>
  );
}

export default GoogleTranslate;
