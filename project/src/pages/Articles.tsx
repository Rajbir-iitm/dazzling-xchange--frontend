import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { collection, getDocs, query as fbQuery, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Article {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

function Articles() {
  // Removed unused t and navigate variables
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
        <div className="max-w-7xl mx-auto px-6 py-20 lg:px-24">
          {/* Loading Hero */}
          <motion.div 
            className="text-center space-y-8 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="w-32 h-8 bg-neutral-800 rounded-lg mx-auto animate-pulse"></div>
              <div className="w-96 h-12 bg-neutral-800 rounded-lg mx-auto animate-pulse"></div>
            </div>
            <div className="w-full max-w-md mx-auto h-12 bg-neutral-800 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Loading Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-neutral-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-neutral-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-neutral-700 rounded"></div>
                  <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:px-24">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary font-primary">
                Articles
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-lg lg:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed font-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover expert insights, tutorials, and comprehensive guides to master international money transfers and financial solutions.
            </motion.p>
          </div>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
            <input
              type="search"
              placeholder="Search articles and guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                w-full bg-neutral-800 text-secondary placeholder-neutral-400 font-primary
                rounded-full pl-12 pr-6 py-4 transition-all duration-300
                border border-neutral-700 focus:outline-none 
                focus:border-primary focus:ring-2 focus:ring-primary/20
                hover:border-neutral-600
              "
            />
          </motion.div>
        </motion.div>

        {/* Results Count */}
        {query && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-neutral-400 font-primary">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found for "{query}"
            </p>
          </motion.div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  to={`/articles/${article.id}`}
                  className="group block bg-neutral-800 rounded-2xl overflow-hidden card-hover-glow transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center text-neutral-500 text-sm font-primary">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Article</span>
                    </div>
                    <h3 className="text-secondary text-xl font-semibold font-primary group-hover:text-primary transition-colors duration-200 truncate">
                      {article.title}
                    </h3>
                    <p className="text-neutral-300 text-sm font-primary leading-relaxed overflow-hidden"
                       style={{
                         display: '-webkit-box',
                         WebkitLineClamp: 3,
                         WebkitBoxOrient: 'vertical',
                       }}>
                      {article.description || 'Explore this comprehensive guide to enhance your understanding of international financial services.'}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium font-primary group-hover:text-accent transition-colors duration-200">
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-20 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-neutral-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-secondary text-2xl font-semibold font-primary">No articles found</h3>
              <p className="text-neutral-400 font-primary max-w-md mx-auto">
                {query 
                  ? "We couldn't find any articles matching your search. Try different keywords or browse all articles." 
                  : "No articles are available at the moment. Check back soon for new content!"
                }
              </p>
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="px-8 py-3 bg-primary text-neutral-900 rounded-full font-medium font-primary hover:bg-accent transition-all duration-200 hover:scale-105"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Articles;