import React, { useEffect, useState } from 'react';
import { Clock, Settings } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface Event {
  id: number;
  title: string;
  slug: string;
  banner_url: string;
  content: string;
  event_date: string;
  event_time: string;
  event_venue: string;
  highlights: string; // JSON string
  speaker_name: string;
  speaker_photo_url: string;
  speaker_details: string;
  gallery_images: string; // JSON string
  registration_link: string;
  venue_map_link: string;
  category_name?: string;
  created_at: string;
}

export default function EventDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [slug]);

  const fetchEvent = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      // decodeURIComponent ensures we send exactly the string we need to the backend
      const res = await fetch(`${API_URL}/api/events/${encodeURIComponent(slug || '')}`);
      const data = await res.json();
      if (data.success) {
        setEvent(data.event);
      } else {
        navigate('/events');
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#f3f3f9] flex justify-center items-center">
        <span className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!event) return null;

  let highlightsArr: string[] = [];
  try { 
    highlightsArr = Array.isArray(event.highlights) ? event.highlights : (event.highlights ? JSON.parse(event.highlights) : []); 
  } catch (e) { }

  let galleryArr: string[] = [];
  try { 
    galleryArr = Array.isArray(event.gallery_images) ? event.gallery_images : (event.gallery_images ? JSON.parse(event.gallery_images) : []); 
  } catch (e) { }

  // Generate some tags from highlights
  let tags = ['AdmaEvents'];
  if (highlightsArr.length > 0) {
    tags = [...tags, ...highlightsArr.slice(0, 2).map(h => h.split(' ')[0])].filter(t => t);
  }

  return (
    <div className="bg-[#f3f3f9] min-h-screen pt-24 pb-16">
      <Helmet>
        <title>{event.title} - Adma Events</title>
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header & Banner Section - Card 1 */}
        <div className="bg-white rounded-md shadow-sm border border-slate-200/60 p-6 md:p-8 mb-6 relative overflow-hidden">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3 block">
              {event.category_name || 'EVENTS & WORKSHOPS'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-5 leading-tight">{event.title}</h1>
            <p className="text-slate-500 text-sm mb-6">Learn more about our initiatives, sessions, and how it remains impactful today.</p>

            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-md font-medium">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full aspect-[21/9] md:aspect-[3/1] rounded-md overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
            <img
              src={event.banner_url}
              alt={event.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Main Content & Sidebar */}
        {/* Main Content & Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Left Sidebar - Card 2 */}
          <div className="w-full md:w-[30%] min-w-0 shrink-0 flex flex-col gap-6">

            <div className="bg-white rounded-md shadow-sm border border-slate-200/60 p-6">
              <h5 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Contributor By:</h5>
              <div className="flex items-start space-x-3 mb-6">
                {event.speaker_photo_url ? (
                  <img src={event.speaker_photo_url} alt="Speaker" className="w-12 h-12 rounded-md object-cover border border-slate-200" />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="font-bold text-lg">A</span>
                  </div>
                )}
                <div>
                  <h6 className="text-sm font-bold text-blue-600 mb-0.5">{event.speaker_name || 'Admin'}</h6>
                  <p className="text-xs text-slate-500 mb-1">Event Host</p>
                  <p className="text-xs text-slate-400 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {new Date(event.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {event.speaker_details && (
                <div className="bg-[#f3f3f9] border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h6 className="text-sm font-bold text-slate-800 mb-2 flex items-center">
                    About the Speaker
                  </h6>
                  <div
                    className="text-sm text-slate-600 leading-relaxed italic prose prose-sm prose-slate max-w-none overflow-hidden [&_*]:whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: event.speaker_details.replace(/&nbsp;/g, ' ') }}
                  />
                </div>
              )}

            </div>

            {/* Action/Register Block */}
            <div className="bg-white rounded-md shadow-sm border border-slate-200/60 p-6">
              <h6 className="text-xs font-bold text-slate-700 uppercase mb-3 border-b border-slate-100 pb-2">Event Info</h6>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-slate-600 font-medium">
                  <span className="block text-xs text-slate-400 mb-0.5">Date</span>
                  {event.event_date && new Date(event.event_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                {event.event_time && (
                  <p className="text-sm text-slate-600 font-medium">
                    <span className="block text-xs text-slate-400 mb-0.5">Time</span>
                    {event.event_time}
                  </p>
                )}
                {event.event_venue && (
                  <p className="text-sm text-slate-600 font-medium line-clamp-3">
                    <span className="block text-xs text-slate-400 mb-0.5">Venue</span>
                    {event.event_venue}
                  </p>
                )}
              </div>

              {event.registration_link && (
                <a href={event.registration_link} target="_blank" rel="noreferrer" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm shadow-blue-500/20">
                  Register Now
                </a>
              )}
            </div>
          </div>

          {/* Right Content - Card 3 */}
          <div className="w-full md:w-[70%] min-w-0 bg-white rounded-md shadow-sm border border-slate-200/60 p-6 md:p-8">
            <h5 className="text-lg font-bold text-slate-800 mb-6">Introduction:</h5>
            <div
              className="prose prose-slate prose-img:rounded-md max-w-none text-slate-600 leading-relaxed mb-8 overflow-hidden [&_*]:whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: event.content.replace(/&nbsp;/g, ' ') }}
            />

            {highlightsArr.length > 0 && highlightsArr[0] !== "" && (
              <div className="mb-8">
                <h5 className="text-lg font-bold text-slate-800 mb-4">Key Highlights:</h5>
                <ul className="space-y-3 pl-2">
                  {highlightsArr.map((point, index) => (
                    <li key={index} className="flex items-start text-slate-600">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {galleryArr.length > 0 && (
              <div>
                <h5 className="text-lg font-bold text-slate-800 mb-4">Gallery:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryArr.map((imgUrl, idx) => (
                    <div key={idx} className="aspect-video rounded-md overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                      <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
