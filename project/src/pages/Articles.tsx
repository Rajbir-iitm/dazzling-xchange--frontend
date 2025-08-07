import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
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
      <div className="bg-black min-h-screen">
        <section className="articles-header bg-black py-16 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
            <div className="animate-pulse">
              <div className="h-12 bg-[#111] rounded mb-4 w-96"></div>
              <div className="h-6 bg-[#111] rounded mb-8 w-80"></div>
              <div className="h-12 bg-[#111] rounded-full w-full max-w-xl"></div>
            </div>
          </div>
        </section>
        <div className="px-8 lg:px-16 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#111] rounded-2xl overflow-hidden">
                  <div className="h-40 bg-gray-800"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-800 rounded mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded"></div>
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
    <div className="bg-black min-h-screen">
      {/* Centered Header Section */}
      <section className="articles-header bg-black py-16 px-8 lg:px-16">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
          {/* Title */}
          <h1 className="text-white text-4xl lg:text-5xl font-bold">
            Articles & Tutorials
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-300 text-lg lg:text-xl">
            Browse our latest guides, tutorials, and deep-dives into international money transfers.
          </p>
          
          {/* Search Bar */}
          <div className="w-full relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                w-full bg-[#111] text-white placeholder-gray-500
                rounded-full pl-12 pr-6 py-3 transition-all duration-200
                border border-gray-800 focus:outline-none 
                focus:border-[#16d68f] focus:ring-2 focus:ring-[#16d68f]
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
            <p className="text-gray-400 mb-6">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </p>
          )}

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  to={`/articles/${article.id}`}
                  key={article.id}
                  className="group block bg-[#111] rounded-2xl overflow-hidden card-hover-glow transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#16d68f] transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {article.description || 'Click to view this chapter content.'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-500 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-400">
                Try adjusting your search terms or browse all articles.
              </p>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="mt-4 px-6 py-2 bg-[#16d68f] text-black rounded-full font-medium hover:bg-[#14c07f] transition-colors duration-200"
                >
                  Clear Search
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