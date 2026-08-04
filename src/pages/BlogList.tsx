import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

export default function BlogList() {
  return (
    <main className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Blog Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display text-slate-900 mb-6 tracking-tight">
            Knowledge & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">Insights</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover the latest trends in tech upskilling, career growth, and industry insights tailored for professionals in Coimbatore and beyond.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group flex flex-col"
            >
              <Link to={`/blog/${blog.slug}`} className="block relative overflow-hidden aspect-[16/10]">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.readTime}</span>
                </div>
                
                <Link to={`/blog/${blog.slug}`} className="block group-hover:text-blue-700 transition-colors">
                  <h2 className="text-xl font-bold text-slate-900 mb-3 leading-snug line-clamp-2">
                    {blog.title}
                  </h2>
                </Link>
                
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                  {blog.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${blog.slug}`} 
                  className="mt-auto inline-flex items-center text-sm font-bold text-blue-700 group-hover:text-blue-800"
                >
                  Read Article <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
