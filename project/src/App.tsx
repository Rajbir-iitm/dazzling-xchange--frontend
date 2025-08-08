import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavRail from './components/NavRail';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import SalesModal from './components/SalesModal';
import logo from './assets/Untitled design - 2025-07-02T030507.802.png';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="min-h-screen bg-neutral-950 w-full overflow-x-hidden min-w-[320px] font-primary">
  <NavRail />
        
        {/* Mobile Top Navigation */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-neutral-950 flex items-center justify-between px-4 z-40 border-b border-neutral-800">
          <Link 
            to="/"
            className="w-8 h-8 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-200"
            title={t('nav.home')}
            aria-label={t('aria.goHome')}
          >
            <img 
              src={logo} 
              alt={t('aria.logoAlt')} 
              className="w-full h-full max-w-[2rem] max-h-[2rem] object-contain"
            />
          </Link>
        </div>

        {/* Main Content */}
        <main className="lg:ml-20 pt-20 lg:pt-0 w-full max-w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
          </Routes>
        </main>

        {/* Sales Modal */}
        <SalesModal />

      </div>
    </Router>
  );
}

export default App;