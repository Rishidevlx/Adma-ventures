import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PhoneCall } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Events from './pages/Events';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import EventsList from './pages/admin/EventsList';
import AddEvent from './pages/admin/AddEvent';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-blue-700 selection:text-white flex flex-col">
      {!isAdminRoute && <Header />}

      <div className={isAdminRoute ? "flex-grow" : "flex-grow pt-24"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="events" element={<EventsList />} />
            <Route path="events/add" element={<AddEvent />} />
            <Route path="events/edit/:id" element={<AddEvent />} />
          </Route>
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && (
        <a 
          href="tel:+918754659759" 
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-blue-700 text-white p-4 rounded-full shadow-lg shadow-blue-700/30 hover:scale-110 hover:bg-blue-600 hover:shadow-blue-700/50 transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Call Us"
        >
          <div className="absolute inset-0 rounded-full bg-blue-700 animate-ping opacity-25"></div>
          <PhoneCall size={26} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          
          <span className="absolute right-full mr-4 bg-gray-50 text-blue-700 text-sm font-mono font-bold px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-700/20">
            +91 87546 59759
          </span>
        </a>
      )}
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Toaster position="top-right" />
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}
