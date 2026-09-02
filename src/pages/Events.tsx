import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  slug: string;
  banner_url: string;
  event_date: string;
  event_time: string;
  event_venue: string;
  registration_link: string;
  category_name?: string;
  speaker_name?: string;
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

  const getOptimizedImage = (url: string) => {
    if (!url?.includes('cloudinary.com')) return url;
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
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 overflow-hidden group flex flex-col"
              >
                <Link to={`/events/${encodeURIComponent(event.slug)}`} className="block relative h-56 bg-slate-100 overflow-hidden">
                  <img 
                    src={getOptimizedImage(event.banner_url)} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {event.event_date && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold text-blue-600 shadow-sm border border-white/20">
                      {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  )}
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  {event.category_name && (
                    <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">
                      {event.category_name}
                    </div>
                  )}
                  <Link to={`/events/${encodeURIComponent(event.slug)}`}>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                  </Link>
                  
                  <div className="space-y-2.5 mb-6">
                    {event.event_time && (
                      <div className="flex items-start text-sm text-slate-600 space-x-3">
                         <Clock className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                         <span>{event.event_time}</span>
                      </div>
                    )}
                    {event.event_venue && (
                      <div className="flex items-start text-sm text-slate-600 space-x-3">
                         <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                         <span className="line-clamp-2">{event.event_venue}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                     <Link to={`/events/${encodeURIComponent(event.slug)}`} className="text-blue-600 font-medium text-sm flex items-center space-x-1 hover:text-blue-700 transition-colors">
                        <span>View Details</span> <ArrowRight size={16} />
                     </Link>
                     {event.registration_link && (
                        <a 
                          href={event.registration_link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                          Register
                        </a>
                     )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
