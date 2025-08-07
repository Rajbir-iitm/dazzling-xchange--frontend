import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import Footer from '../components/Footer';
import FloatingTOC from '../components/FloatingTOC';
// Removed empty floating-toc.css import
import { doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ContentBlock {
  id: string;
  type: string;
  content: string;
}

interface ArticleTopic {
  id: string;
  title: string;
  content?: string;
  blocks?: ContentBlock[];
  order: number;
}

interface ArticleDetail {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  topics: ArticleTopic[];
}

function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  const tocRef = useRef<HTMLDivElement>(null);
  const articleContainerRef = useRef<HTMLDivElement>(null);
  const [tocStyle, setTocStyle] = useState({});

  // Error message to display when not loading
  const errorMessage = !loading && error ? (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-200 p-4 rounded-lg mb-8">
        {error}
        <div className="mt-4">
          <Link to="/articles" className="text-brand-500 hover:text-brand-400 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Articles
          </Link>
        </div>
      </div>
    </div>
  ) : null;

  // Load chapter and topics from Firestore
  useEffect(() => {
    const fetchChapterAndTopics = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Get chapter document
        const chapterRef = doc(db, 'chapters', id);
        const chapterSnap = await getDoc(chapterRef);
        
        if (!chapterSnap.exists()) {
          setError('Chapter not found');
          setLoading(false);
          return;
        }
        
        const chapterData = chapterSnap.data();
        
        // Get topics for this chapter
        const topicsRef = collection(db, `chapters/${id}/topics`);
        const topicsQuery = query(topicsRef, orderBy('order'));
        const topicsSnap = await getDocs(topicsQuery);
        
        const topicsData = topicsSnap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled Topic',
            blocks: data.blocks || [],
            content: data.content,
            order: data.order || 0
          };
        });
        
        const articleData: ArticleDetail = {
          id: chapterSnap.id,
          title: chapterData.title || 'Untitled Chapter',
          description: chapterData.description || 'No description available.',
          imageUrl: chapterData.imageUrl,
          topics: topicsData as ArticleTopic[]
        };
        
        setArticle(articleData);
        
        // Set initial active section if topics exist
        if (topicsData.length > 0) {
          setActiveSection(topicsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching chapter data:', error);
        setError('Failed to load chapter data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchChapterAndTopics();
  }, [id]);

  // Smooth scroll to section
  useEffect(() => {
    const handleSectionClick = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const links = document.querySelectorAll('nav[aria-label="Table of contents"] a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleSectionClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleSectionClick));
    };
  }, [article]);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [article]);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleContainerRef.current) return;
      
      // Calculate TOC placement
      const toc = tocRef.current as HTMLDivElement;
      const container = articleContainerRef.current as HTMLDivElement;
      const footerOffset = 32; // px from bottom
      const scrollY = window.scrollY;
      const containerTop = container.offsetTop;
      const containerBottom = container.offsetTop + container.offsetHeight;
      const tocHeight = toc.offsetHeight;
      const headerOffset = 32; // px from top
      const tocTop = scrollY + headerOffset;
      const tocBottom = tocTop + tocHeight;

      // If above the article, absolute at the top
      if (scrollY + headerOffset <= containerTop) {
        setTocStyle({ position: 'absolute', top: 0, left: 0, width: 250 });
      }
      // If below the article, absolute at the bottom
      else if (tocBottom + footerOffset >= containerBottom) {
        setTocStyle({
          position: 'absolute',
          top: container.offsetHeight - tocHeight - footerOffset,
          left: 0,
          width: 250,
        });
      }
      // Else, fixed within the viewport
      else {
        setTocStyle({
          position: 'fixed',
          top: headerOffset,
          left: container.getBoundingClientRect().left,
          width: 250,
          zIndex: 30,
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('scroll'));
        }
      }, 0);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 animate-pulse flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-80"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-neutral-950 min-h-screen">
        <div className="py-16 px-8 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-secondary text-4xl font-bold font-primary mb-4">Article Not Found</h1>
            <p className="text-neutral-300 font-primary mb-8">The article you're looking for doesn't exist.</p>
            <Link
              to="/articles"
              className="inline-flex items-center px-6 py-3 bg-primary text-neutral-900 rounded-full font-medium font-primary hover:bg-accent transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="py-16 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Back Link & Header */}
          <Link
            to="/articles"
            className="inline-flex items-center text-neutral-400 mb-6 hover:text-secondary transition-colors duration-200 group font-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Articles
          </Link>

          <h1 className="text-secondary text-4xl lg:text-5xl font-bold font-primary mb-4">
            {article.title}
          </h1>
          
          <p className="text-neutral-300 mb-6 max-w-3xl text-lg leading-relaxed font-primary">
            {article.description}
          </p>

          {/* Featured image */}
          <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl mb-8 overflow-hidden">
            {article?.imageUrl ? (
              <div className="w-full h-full opacity-70 bg-center bg-cover" style={{ backgroundImage: `url(${article.imageUrl})` }}></div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="w-24 h-24 text-neutral-600" />
              </div>
            )}
          </div>

          {/* Article metadata */}
          <div className="flex flex-wrap gap-4 text-neutral-400 text-sm mb-8 font-primary">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{article?.topics?.length || 0} Topics</span>
            </div>
          </div>

          {loading && (
            <div className="max-w-4xl mx-auto p-6">
              <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 animate-pulse flex items-center justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-80"></div>
                  </div>
                  <p className="text-neutral-400 font-primary">Loading chapter content...</p>
                </div>
              </div>
            </div>
          )}
          
          {errorMessage}

          {/* Bounded floating TOC layout */}
          <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', position: 'relative' }} ref={articleContainerRef}>
            <aside
              ref={tocRef}
              style={tocStyle}
              className="hidden lg:block"
            >
              {loading ? (
                <div className="animate-pulse space-y-4 bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
                  <div className="h-6 bg-neutral-700 rounded w-3/4 mb-2"></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-neutral-700 rounded w-5/6 mb-2"></div>
                  ))}
                </div>
              ) : (
                <FloatingTOC sections={article.topics} activeSection={activeSection} />
              )}
            </aside>
            <main style={{ flex: 1, marginLeft: 290 }}>
              <div className="space-y-12">
                {article.topics.map((section) => (
                  <section
                    id={section.id}
                    key={section.id}
                    className="scroll-mt-24"
                  >
                    <h2 className="text-2xl text-primary font-semibold font-primary mb-6">
                      {section.title}
                    </h2>
                    <div
                      className="prose prose-invert max-w-none prose-lg
                        prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-4
                        prose-headings:text-secondary prose-headings:font-semibold
                        prose-strong:text-secondary prose-strong:font-semibold
                        prose-ul:text-neutral-300 prose-ol:text-neutral-300 prose-ul:mb-4 prose-ol:mb-4
                        prose-li:text-neutral-300 prose-li:leading-relaxed prose-li:mb-1
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-code:text-primary prose-code:bg-neutral-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                        prose-blockquote:border-l-primary prose-blockquote:bg-neutral-800 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:mb-4
                        prose-blockquote:text-neutral-300" style={{ color: '#fff' }}
                    >
                      {section.content ? (
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                      ) : section.blocks && section.blocks.length > 0 ? (
                        <div>
                          {section.blocks.map((block) => (
                            <div key={block.id} className="mb-4">
                              {block.type === 'paragraph' && (
                                <p>{block.content}</p>
                              )}
                              {/* Add other block type handlers as needed */}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No content available for this topic yet.</p>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ArticleDetail;