import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ArticleView } from './components/ArticleView';
import { Article, Category, ViewState } from './types';
import { MOCK_ARTICLES } from './constants';
import { PlayCircle, ChevronRight, TrendingUp } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ type: 'HOME' });
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);

  // Filter articles based on current view
  const displayArticles = view.type === 'CATEGORY' 
    ? articles.filter(a => a.category === view.category)
    : articles;

  const featuredArticle = displayArticles.length > 0 ? displayArticles[0] : null;
  const secondaryArticles = displayArticles.slice(1, 4);
  const gridArticles = displayArticles.slice(4);

  // Helper for navigation
  const navigateToArticle = (articleId: string) => {
    setView({ type: 'ARTICLE', articleId });
  };

  const getArticleById = (id: string) => articles.find(a => a.id === id);

  // Breaking News Ticker Component
  const BreakingNewsTicker = () => {
    const breaking = articles.filter(a => a.isBreaking);
    if (breaking.length === 0) return null;
    
    return (
      <div className="bg-red-700 text-white text-sm py-2 px-4 flex items-center overflow-hidden relative">
        <span className="font-bold uppercase tracking-wider mr-4 flex-shrink-0 animate-pulse">Breaking News:</span>
        <div className="whitespace-nowrap overflow-hidden flex-1">
          <div className="inline-block animate-marquee">
             {breaking.map(b => (
               <span key={b.id} className="mr-8 cursor-pointer hover:underline" onClick={() => navigateToArticle(b.id)}>
                 {b.title} <span className="mx-2 text-red-300">|</span>
               </span>
             ))}
          </div>
        </div>
      </div>
    );
  };

  // Main Render Logic
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar currentView={view} onNavigate={setView} />
      
      {view.type === 'ARTICLE' && view.articleId ? (
        (() => {
          const article = getArticleById(view.articleId);
          if (!article) return <div>Article not found</div>;
          return (
            <ArticleView 
              article={article} 
              onBack={() => setView({ type: 'HOME' })} 
              onCategoryClick={(cat) => setView({ type: 'CATEGORY', category: cat })}
            />
          );
        })()
      ) : (
        <>
          <BreakingNewsTicker />
          
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
            
            {/* Page Title for Categories */}
            {view.type === 'CATEGORY' && (
              <div className="mb-6 border-b-2 border-black pb-2 flex items-baseline justify-between">
                <h2 className="text-3xl font-black uppercase tracking-tight">{view.category}</h2>
                <span className="text-sm text-gray-500 font-bold">Latest Headlines</span>
              </div>
            )}

            {/* Empty State */}
            {displayArticles.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <h3 className="text-xl font-bold">No articles found in this section.</h3>
                <p>Please check back later.</p>
              </div>
            )}

            {/* Hero Section */}
            {featuredArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                {/* Main Featured Story (Left 8 Cols) */}
                <div className="lg:col-span-8 group cursor-pointer" onClick={() => navigateToArticle(featuredArticle.id)}>
                  <div className="relative overflow-hidden rounded-lg shadow-sm mb-3">
                    <img 
                      src={featuredArticle.imageUrl} 
                      alt={featuredArticle.title} 
                      className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {featuredArticle.category === Category.Video && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
                        <PlayCircle size={64} className="text-white opacity-80" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-red-600 mb-2 uppercase">
                    <span>{featuredArticle.category}</span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-500">{featuredArticle.timestamp}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-red-700 transition-colors">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-lg text-gray-600 font-serif line-clamp-2">
                    {featuredArticle.summary}
                  </p>
                </div>

                {/* Secondary Stories (Right 4 Cols) */}
                <div className="lg:col-span-4 flex flex-col space-y-6 border-l border-gray-100 pl-0 lg:pl-6">
                  <div className="flex items-center space-x-2 mb-2">
                     <TrendingUp size={20} className="text-red-600" />
                     <h3 className="font-bold text-lg uppercase">Top Stories</h3>
                  </div>
                  
                  {secondaryArticles.map(article => (
                    <div key={article.id} className="group cursor-pointer flex lg:flex-col gap-4" onClick={() => navigateToArticle(article.id)}>
                      <div className="w-1/3 lg:w-full aspect-video rounded-md overflow-hidden relative">
                         <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-2/3 lg:w-full">
                        <span className="text-xs font-bold text-red-600 uppercase block mb-1">{article.category}</span>
                        <h4 className="text-lg font-bold leading-snug group-hover:text-red-700 transition-colors line-clamp-3">
                          {article.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Standard Grid Section */}
            {gridArticles.length > 0 && (
              <div className="border-t-4 border-black pt-6">
                <h3 className="text-2xl font-bold mb-6">More News</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {gridArticles.map(article => (
                    <div key={article.id} className="group cursor-pointer flex flex-col h-full" onClick={() => navigateToArticle(article.id)}>
                      <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md mb-3">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title} 
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      </div>
                      <div className="flex flex-col flex-grow">
                         <div className="flex items-center justify-between text-xs mb-2">
                            <span className="font-bold text-red-600 uppercase">{article.category}</span>
                            <span className="text-gray-400">{article.timestamp}</span>
                         </div>
                         <h3 className="text-xl font-bold mb-2 leading-snug group-hover:text-red-700 transition-colors">
                           {article.title}
                         </h3>
                         <p className="text-gray-600 text-sm font-serif line-clamp-3 flex-grow">
                           {article.summary}
                         </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </main>
          
          {/* Footer */}
          <footer className="bg-black text-white py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="bg-red-600 text-white font-bold text-2xl tracking-tighter px-2 py-1 rounded-sm inline-block mb-4">
                  NOVA
                </div>
                <p className="text-gray-400 text-sm">
                  Delivering truth, innovation, and clarity in a complex world.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase text-gray-500 text-sm">Sections</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="hover:text-white cursor-pointer">World</li>
                  <li className="hover:text-white cursor-pointer">US Politics</li>
                  <li className="hover:text-white cursor-pointer">Business</li>
                  <li className="hover:text-white cursor-pointer">Tech</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase text-gray-500 text-sm">About Us</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="hover:text-white cursor-pointer">Careers</li>
                  <li className="hover:text-white cursor-pointer">Code of Ethics</li>
                  <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                  <li className="hover:text-white cursor-pointer">Terms of Service</li>
                </ul>
              </div>
              <div>
                 <h4 className="font-bold mb-4 uppercase text-gray-500 text-sm">Newsletter</h4>
                 <div className="flex">
                   <input type="email" placeholder="Your email" className="bg-gray-800 border-none text-sm px-3 py-2 w-full focus:ring-1 focus:ring-red-500 outline-none" />
                   <button className="bg-red-600 px-4 py-2 font-bold text-sm uppercase hover:bg-red-700">
                     <ChevronRight size={16} />
                   </button>
                 </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
              &copy; 2024 NovaNews Media. All rights reserved. Powered by Google Gemini.
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
