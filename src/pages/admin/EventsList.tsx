import React, { useEffect, useState } from 'react';
import { PlusCircle, Search, Edit, Trash2, CalendarDays, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  slug: string;
  status: string;
  banner_url: string;
  content: string;
  category_id?: number;
  event_date: string;
  event_time: string;
  event_venue: string;
  highlights: string;
  created_at: string;
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const navigate = useNavigate();
  const location = useLocation();
  const isDraftMode = location.search.includes('status=draft');

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/admin/categories`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/admin/events`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('adminToken');
    const loadingToast = toast.loading('Deleting event...');
    setDeleteConfirmId(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/admin/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Event deleted successfully', { id: loadingToast });
        setEvents(events.filter(e => e.id !== id));
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete event', { id: loadingToast });
    }
  };

  const displayedEvents = events.filter(e => {
    const statusMatch = isDraftMode ? e.status === 'draft' : (e.status !== 'draft');
    const searchMatch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (e.event_venue && e.event_venue.toLowerCase().includes(searchQuery.toLowerCase()));
    const categoryMatch = selectedCategory === 'All' || e.category_id === parseInt(selectedCategory);
    return statusMatch && searchMatch && categoryMatch;
  });

  const getOptimizedImage = (url: string) => {
    if (!url?.includes('cloudinary.com')) return url;
    return url.replace('/upload/', '/upload/f_auto,q_auto,c_fill,w_800,h_500/');
  };

  const stripHtml = (html: string) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isDraftMode ? 'Draft Events' : 'Published Events'}</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and organize your {isDraftMode ? 'drafted' : 'published'} events</p>
        </div>
        
        <Link 
          to="/admin/events/add" 
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm w-fit"
        >
          <PlusCircle size={18} />
          <span>Add New Event</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* SIDEBAR (Velzon Style Filters) */}
        <div className="w-full lg:w-1/4 shrink-0 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`text-sm flex items-center w-full transition-colors ${selectedCategory === 'All' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  <ChevronRight size={14} className={`mr-2 ${selectedCategory === 'All' ? 'text-blue-600' : 'text-slate-400'}`} />
                  All Events
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setSelectedCategory(cat.id.toString())}
                    className={`text-sm flex items-center w-full transition-colors ${selectedCategory === cat.id.toString() ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-blue-600'}`}
                  >
                    <ChevronRight size={14} className={`mr-2 ${selectedCategory === cat.id.toString() ? 'text-blue-600' : 'text-slate-400'}`} />
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MAIN CONTENT AREA (List View) */}
        <div className="w-full lg:w-3/4">
          
          {/* Top action bar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex justify-between items-center">
            <div className="relative w-full max-w-xs">
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </div>
            <div>
              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2">
                <option>Latest Events</option>
                <option>Oldest Events</option>
              </select>
            </div>
          </div>

          {/* List of Events */}
          <div className="space-y-5">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-slate-200">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500">Loading events...</p>
              </div>
            ) : displayedEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-slate-200">
                <CalendarDays className="text-slate-300 w-16 h-16 mb-4" />
                <h3 className="text-lg font-medium text-slate-700">No {isDraftMode ? 'draft' : 'published'} events found</h3>
                <p className="text-slate-500 mt-1">Adjust your search or add a new event.</p>
              </div>
            ) : (
              displayedEvents.map((event) => {
                let tags: string[] = [];
                try {
                  const parsed = JSON.parse(event.highlights);
                  if (Array.isArray(parsed)) tags = parsed.slice(0, 3).filter(t => t.trim() !== '');
                } catch(e) {}

                return (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row relative group">
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm shadow-sm ${event.status === 'draft' ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'}`}>
                        {event.status || 'published'}
                      </span>
                    </div>

                    {/* Card Image */}
                    <div className="w-full md:w-2/5 lg:w-1/3 shrink-0 h-56 md:h-auto overflow-hidden relative bg-slate-100">
                      <img 
                        src={getOptimizedImage(event.banner_url) || 'https://via.placeholder.com/800x500?text=No+Image'} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-1 w-full">
                      <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Adma Event</div>
                      
                      <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3 line-clamp-2 pr-12">
                        {event.title}
                      </h2>

                      <div className="flex flex-wrap items-center text-sm text-slate-500 gap-y-2 gap-x-4 mb-4 font-medium">
                        {event.event_date && (
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1.5" />
                            {new Date(event.event_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                        {event.event_time && (
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1.5" />
                            {event.event_time}
                          </span>
                        )}
                        <span className="flex items-center">
                          <User size={14} className="mr-1.5" />
                          Admin
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm line-clamp-2 break-words text-wrap mb-5 leading-relaxed min-w-0 overflow-hidden">
                        {stripHtml(event.content) || "No description provided."}
                      </p>

                      <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-4">
                        <div className="flex items-center space-x-2">
                          <Link 
                            to={`/admin/events/edit/${event.id}`}
                            className="flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </Link>
                          
                          {deleteConfirmId === event.id ? (
                            <div className="flex items-center space-x-2 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                              <span className="text-xs text-red-600 font-medium">Delete?</span>
                              <button onClick={() => handleDelete(event.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">Yes</button>
                              <button onClick={() => setDeleteConfirmId(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded text-xs font-bold">No</button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setDeleteConfirmId(event.id)}
                              className="flex items-center space-x-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                        
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium truncate max-w-[120px]">
                                #{tag.replace(/\s+/g, '')}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
