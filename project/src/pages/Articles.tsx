import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Footer from '../components/Footer';
import { collection, getDocs, query as fbQuery, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTranslation } from 'react-i18next';

interface Article {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

function Articles() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch chapters from Firestore to display as articles
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const chaptersRef = collection(db, 'chapters');
        const chaptersQuery = fbQuery(chaptersRef, orderBy('title'));
        const chaptersSnapshot = await getDocs(chaptersQuery);

        const chaptersData: Article[] = chaptersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled Chapter',
            description: data.description || '',
            imageUrl: data.imageUrl || 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
          };
        });
        
        console.log('Loaded chapters from Firestore:', chaptersData);
        setArticles(chaptersData);
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    (article.description && article.description.toLowerCase().includes(query.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen">
        <section className="articles-header bg-neutral-950 py-16 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 animate-pulse flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-80"></div>
              </div>
            </div>
          </div>
        </section>
        <div className="px-8 lg:px-16 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-neutral-800 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-40 bg-neutral-700"></div>
                  <div className="p-4">
                    <div className="h-6 bg-neutral-700 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Centered Header Section */}
      <section className="articles-header bg-neutral-950 py-16 px-8 lg:px-16">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
          {/* Title */}
          <h1 className="text-secondary text-4xl lg:text-5xl font-bold font-primary">
            {t('articles.title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-neutral-300 text-lg lg:text-xl font-primary">
            {t('articles.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="w-full relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
            <input
              type="search"
              placeholder={t('articles.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                w-full bg-neutral-800 text-secondary placeholder-neutral-400 font-primary
                rounded-full pl-12 pr-6 py-3 transition-all duration-200
                border border-neutral-700 focus:outline-none 
                focus:border-primary focus:ring-2 focus:ring-primary/20
                focus:shadow-none
              "
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="px-8 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Results Count */}
          {query && (
            <p className="text-neutral-400 mb-6 font-primary">
              {t('articles.results', { count: filteredArticles.length })}
            </p>
          )}

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  to={`/articles/${article.id}`}
                  key={article.id}
                  className="group block bg-neutral-800 rounded-2xl overflow-hidden card-hover-glow transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-secondary text-xl font-semibold font-primary mb-2 group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-neutral-300 text-sm font-primary leading-relaxed">
                      {article.description || t('articles.viewChapter')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-neutral-500 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-secondary text-xl font-semibold font-primary mb-2">{t('articles.emptyTitle')}</h3>
              <p className="text-neutral-400 font-primary">
                {t('articles.emptySubtitle')}
              </p>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="mt-4 px-6 py-2 bg-primary text-neutral-900 rounded-full font-medium font-primary hover:bg-accent transition-colors duration-200"
                >
                  {t('actions.clearSearch')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Articles;