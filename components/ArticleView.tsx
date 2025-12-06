import React, { useEffect, useState } from 'react';
import { Article, Category } from '../types';
import { generateFullArticle } from '../services/newsService';
import { Share2, Clock, User, Bookmark, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Assuming we can use this, if not we will parse simply. 
// Note: Since I cannot add new dependencies easily in this prompt constraint without package.json modification, 
// I will write a simple Markdown parser or just display text with whitespace preservation if ReactMarkdown isn't available. 
// For this environment, I will use a simple whitespace preserve div.

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onCategoryClick: (cat: Category) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack, onCategoryClick }) => {
  const [content, setContent] = useState<string | null>(article.content || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // If no content, generate it
    if (!article.content && !content) {
      const fetchContent = async () => {
        setLoading(true);
        const generated = await generateFullArticle(article);
        setContent(generated);
        setLoading(false);
      };
      fetchContent();
    }
  }, [article, content]);

  return (
    <div className="bg-white min-h-screen pb-12">
       {/* Breadcrumb / Back */}
       <div className="max-w-4xl mx-auto px-4 py-4 flex items-center text-sm text-gray-500">
         <button onClick={onBack} className="flex items-center hover:text-red-600 transition-colors">
           <ArrowLeft size={16} className="mr-1" /> Back to News
         </button>
         <span className="mx-2">/</span>
         <button onClick={() => onCategoryClick(article.category)} className="uppercase font-bold hover:text-red-600">
           {article.category}
         </button>
       </div>

       <article className="max-w-4xl mx-auto px-4">
         <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
           {article.title}
         </h1>

         <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
           <div className="flex items-center space-x-4 mb-4 md:mb-0">
             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={20} className="text-gray-500" />
             </div>
             <div>
               <p className="text-sm font-bold text-gray-900">By <span className="text-red-600">{article.author}</span></p>
               <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  {article.timestamp}
               </div>
             </div>
           </div>
           
           <div className="flex space-x-3">
             <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition">
               <Share2 size={20} />
             </button>
             <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition">
               <Bookmark size={20} />
             </button>
           </div>
         </div>

         <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-lg">
           <img 
             src={article.imageUrl} 
             alt={article.title} 
             className="w-full h-full object-cover"
           />
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
             <p className="text-white text-sm opacity-90">Image source: Picsum Photos</p>
           </div>
         </div>

         <div className="prose prose-lg max-w-none text-gray-800 font-serif leading-relaxed">
           <p className="text-xl md:text-2xl font-bold text-gray-700 mb-8 italic border-l-4 border-red-600 pl-4">
             {article.summary}
           </p>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-12 space-y-4">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
               <p className="text-gray-500 animate-pulse font-sans">Generating full story with Gemini AI...</p>
             </div>
           ) : (
             <div className="whitespace-pre-line">
               {/* Simple markdown rendering simulation since we can't install react-markdown */}
               {content?.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 font-sans text-gray-900">{line.replace('## ', '')}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3 font-sans text-gray-900">{line.replace('### ', '')}</h3>;
                  if (line.startsWith('* ') || line.startsWith('- ')) return <li key={i} className="ml-4 mb-2 list-disc font-sans">{line.substring(2)}</li>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="mb-4">{line}</p>;
               })}
             </div>
           )}
         </div>
       </article>

       {/* Related/Footer Area of Article */}
       <div className="max-w-4xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4">Read Next</h3>
          {/* We would map other articles here, simplified for this component */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">Explore more stories in <button className="text-red-600 font-bold" onClick={() => onCategoryClick(article.category)}>{article.category}</button></p>
          </div>
       </div>
    </div>
  );
};
