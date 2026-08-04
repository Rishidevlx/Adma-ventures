import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogs } from '../data/blogs';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogs.find(b => b.slug === slug);

  // Scroll to top when loading new post
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{blog.metaTitle}</title>
        <meta name="description" content={blog.metaDescription} />
        <meta name="keywords" content={blog.keywords} />
        <link rel="canonical" href={`https://admaventures.in/blog/${blog.slug}`} />
      </Helmet>

      {/* Article Header (Hero) */}
      <div className="bg-slate-50 border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-700 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to all articles
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {blog.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black font-display text-slate-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2"><User size={18} className="text-slate-400" /> {blog.author}</span>
            <span className="flex items-center gap-2"><Calendar size={18} className="text-slate-400" /> {blog.date}</span>
            <span className="flex items-center gap-2"><Clock size={18} className="text-slate-400" /> {blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div 
          className="prose prose-lg prose-slate max-w-none 
                     prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900
                     prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                     prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                     prose-ul:text-slate-600 prose-ul:mb-6 prose-li:mb-2
                     prose-strong:text-slate-900 prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Call to Action block for SEO conversion */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to upskill your career?</h3>
          <p className="text-slate-600 mb-6">Join ADMA Ventures and master the skills top companies are hiring for.</p>
          <a href="/#programs" className="inline-flex items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Explore Our Programs
          </a>
        </div>
      </article>
    </main>
  );
}
