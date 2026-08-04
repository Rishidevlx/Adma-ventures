import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PhoneCall } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-blue-700 selection:text-white flex flex-col">
        {/* Top Floating Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </div>

        {/* Corporate trust and legal Dynamic Footer */}
        <Footer />

        {/* Floating Call Button */}
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
      </div>
    </Router>
    </HelmetProvider>
  );
}
