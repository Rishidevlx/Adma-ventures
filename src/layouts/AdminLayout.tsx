import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  CalendarDays, 
  Menu, 
  X, 
  LogOut, 
  User, 
  ChevronDown, 
  PlusCircle, 
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [eventsOpen, setEventsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <motion.div 
        initial={{ width: 250 }}
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="h-full bg-[#1e293b] text-slate-300 flex flex-col z-20 shadow-xl transition-all duration-300 relative"
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-slate-700/50 bg-[#0f172a]/30">
          <h1 className={`font-bold text-white transition-all ${sidebarOpen ? 'text-xl' : 'text-sm'}`}>
            {sidebarOpen ? 'Adma Admin' : 'AA'}
          </h1>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            
            {/* Events Menu */}
            <div>
              <button 
                onClick={() => setEventsOpen(!eventsOpen)}
                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition-colors ${location.pathname.includes('/events') ? 'bg-blue-600/20 text-blue-400' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <CalendarDays size={20} className={location.pathname.includes('/events') ? 'text-blue-400' : ''} />
                  {sidebarOpen && <span className="font-medium">Events</span>}
                </div>
                {sidebarOpen && (
                  <ChevronDown size={16} className={`transition-transform duration-300 ${eventsOpen ? 'rotate-180' : ''}`} />
                )}
              </button>

              {/* Submenus */}
              <AnimatePresence>
                {sidebarOpen && eventsOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-9 mt-1 space-y-1 overflow-hidden"
                  >
                    <Link 
                      to="/admin/events" 
                      className={`flex items-center space-x-2 py-2 px-3 rounded-md text-sm transition-colors ${location.pathname === '/admin/events' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                    >
                      <List size={16} />
                      <span>All events</span>
                    </Link>
                    <Link 
                      to="/admin/events/add" 
                      className={`flex items-center space-x-2 py-2 px-3 rounded-md text-sm transition-colors ${location.pathname === '/admin/events/add' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                    >
                      <PlusCircle size={16} />
                      <span>Add post</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>

      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-500 hover:text-blue-600 focus:outline-none transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="relative w-64 hidden sm:block">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-slate-50 transition-all"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 border-r border-slate-200 pr-6 hidden sm:flex">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                AD
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 leading-tight">Admin</span>
                <span className="text-xs text-slate-500">Administrator</span>
              </div>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
}
