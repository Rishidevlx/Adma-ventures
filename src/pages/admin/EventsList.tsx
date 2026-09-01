import React, { useEffect, useState } from 'react';
import { PlusCircle, Search, Edit, Trash2, CalendarDays } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  slug: string;
  created_at: string;
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const navigate = useNavigate();

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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">All Events</h1>
        <Link 
          to="/admin/events/add" 
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <PlusCircle size={18} />
          <span className="font-medium">Add Post</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Header/Toolbar */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Event Title</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Date Posted</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Loading events...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <CalendarDays size={24} className="text-slate-400" />
                      </div>
                      <p className="text-lg font-medium text-slate-700 mb-1">No events found</p>
                      <p className="text-sm mb-4">You haven't posted any events yet.</p>
                      <Link to="/admin/events/add" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Create your first event
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{event.title}</td>
                    <td className="px-6 py-4 text-slate-500">{event.slug}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(event.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button 
                          onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmId(event.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Event?</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
