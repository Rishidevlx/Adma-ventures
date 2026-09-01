import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  slug: string;
  banner_url: string;
  content: string;
  created_at: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/events`);
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to append cloudinary transformations for fast loading
  // f_auto,q_auto = auto format and auto quality
  // c_fill,w_800,h_500 = crop/fill to size to prevent massive downloads
  const getOptimizedImage = (url: string) => {
    if (!url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', '/upload/f_auto,q_auto,c_fill,w_800,h_500/');
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Adma <span className="text-blue-600">Events</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Discover the latest events, workshops, and milestones from Adma Ventures.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-sm border border-slate-100 p-16">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No events yet</h3>
            <p className="text-slate-500">Check back later for updates and new events.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden group flex flex-col"
              >
                {/* Image Container with object-contain to preserve original ratio inside the box, 
                    but object-cover is usually better for grids. The user requested object-fit content (contain). */}
                <div className="h-56 bg-slate-100 overflow-hidden relative">
                  <img 
                    src={getOptimizedImage(event.banner_url)} 
                    alt={event.title} 
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-sm">
                    {new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 min-w-0 w-full">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  {/* Rich text content */}
                  <div 
                    className="prose prose-sm prose-slate max-w-none min-w-0 w-full break-words"
                    dangerouslySetInnerHTML={{ __html: event.content.replace(/&nbsp;/g, ' ') }} 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
