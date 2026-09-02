import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { UploadCloud, CheckCircle2, X, Plus, Trash, Image as ImageIcon, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEvent() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  
  // New Fields
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [highlights, setHighlights] = useState<string[]>(['']);
  const [categoryId, setCategoryId] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [speakerPhotoUrl, setSpeakerPhotoUrl] = useState('');
  const [speakerDetails, setSpeakerDetails] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [registrationLink, setRegistrationLink] = useState('');
  const [venueMapLink, setVenueMapLink] = useState('');

  const [uploading, setUploading] = useState(false);
  const [speakerUploading, setSpeakerUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speakerPhotoRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchEventDetails();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/admin/categories`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchEventDetails = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/events/${id}`);
      const data = await res.json();
      if (data.success && data.event) {
        setTitle(data.event.title || '');
        setSlug(data.event.slug || '');
        setContent(data.event.content || '');
        setBannerUrl(data.event.banner_url || '');
        setEventDate(data.event.event_date ? data.event.event_date.split('T')[0] : '');
        setEventTime(data.event.event_time || '');
        setEventVenue(data.event.event_venue || '');
        
        let parsedHighlights = [''];
        try { 
          parsedHighlights = Array.isArray(data.event.highlights) 
            ? data.event.highlights 
            : (data.event.highlights ? JSON.parse(data.event.highlights) : ['']); 
        } catch(e){}
        setHighlights(parsedHighlights.length ? parsedHighlights : ['']);

        setSpeakerName(data.event.speaker_name || '');
        setSpeakerPhotoUrl(data.event.speaker_photo_url || '');
        setSpeakerDetails(data.event.speaker_details || '');
        setCategoryId(data.event.category_id || '');
        
        let parsedGallery = [];
        try { 
          parsedGallery = Array.isArray(data.event.gallery_images) 
            ? data.event.gallery_images 
            : (data.event.gallery_images ? JSON.parse(data.event.gallery_images) : []); 
        } catch(e){}
        setGalleryImages(parsedGallery);
        
        setRegistrationLink(data.event.registration_link || '');
        setVenueMapLink(data.event.venue_map_link || '');
      }
    } catch (error) {
      toast.error('Failed to fetch event details');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent', 'link', 'image'
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'speaker' | 'gallery') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === 'gallery' && (galleryImages.length + files.length) > 3) {
      toast.error('Maximum 3 images allowed for gallery.');
      if (galleryRef.current) galleryRef.current.value = '';
      return;
    }

    const MAX_SIZE = 3 * 1024 * 1024;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_SIZE) {
        toast.error(`Image ${files[i].name} exceeds 3MB limit.`);
        if (type === 'gallery' && galleryRef.current) galleryRef.current.value = '';
        if (type === 'banner' && fileInputRef.current) fileInputRef.current.value = '';
        if (type === 'speaker' && speakerPhotoRef.current) speakerPhotoRef.current.value = '';
        return;
      }
    }

    if (type === 'gallery') setGalleryUploading(true);
    else if (type === 'speaker') setSpeakerUploading(true);
    else setUploading(true);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dmhytkejj';
      
      const uploadPromises = Array.from(files).map(async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'adma_preset');

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.secure_url) {
          return data.secure_url.replace('/upload/', '/upload/q_auto,f_auto/');
        }
        throw new Error('Upload failed');
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      if (type === 'banner') {
        setBannerUrl(uploadedUrls[0]);
        toast.success('Banner uploaded!');
      } else if (type === 'speaker') {
        setSpeakerPhotoUrl(uploadedUrls[0]);
        toast.success('Speaker photo uploaded!');
      } else if (type === 'gallery') {
        setGalleryImages([...galleryImages, ...uploadedUrls]);
        toast.success('Gallery images uploaded!');
      }
      
    } catch (err: any) {
      toast.error('Image upload failed: ' + err.message);
    } finally {
      if (type === 'banner') {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else if (type === 'speaker') {
        setSpeakerUploading(false);
        if (speakerPhotoRef.current) speakerPhotoRef.current.value = '';
      } else if (type === 'gallery') {
        setGalleryUploading(false);
        if (galleryRef.current) galleryRef.current.value = '';
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };
  const addHighlight = () => setHighlights([...highlights, '']);
  const removeHighlight = (index: number) => {
    const newHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(newHighlights.length ? newHighlights : ['']);
  };

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault();
    if (!title || !slug || !content || !bannerUrl || !categoryId) {
      toast.error('Please fill in required fields (Title, Slug, Category, Content, Banner)');
      return;
    }
    
    const cleanHighlights = highlights.filter(h => h.trim() !== '');
    const loadingToast = toast.loading(status === 'draft' ? 'Saving draft...' : 'Publishing event...');
    
    try {
      const token = localStorage.getItem('adminToken');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const url = isEditing 
        ? `${API_URL}/api/admin/events/${id}` 
        : `${API_URL}/api/admin/events`;
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title, slug, content, bannerUrl, status,
          eventDate, eventTime, eventVenue, 
          highlights: cleanHighlights, 
          speakerName, speakerPhotoUrl, speakerDetails, 
          galleryImages, registrationLink, venueMapLink, categoryId: categoryId || null
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to save event');
      }

      toast.success(status === 'draft' ? 'Draft saved!' : 'Event published!', { id: loadingToast });
      navigate(status === 'draft' ? '/admin/events?status=draft' : '/admin/events');
    } catch (error: any) {
      toast.error(error.message || 'Error saving event', { id: loadingToast });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-xl font-bold text-slate-800 uppercase tracking-wide px-2">{isEditing ? 'Edit Event' : 'Create Event'}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN - MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Event Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-3">Event Details</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Event Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={title}
                  placeholder="Enter event title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Event Full Description <span className="text-red-500">*</span></label>
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    modules={modules}
                    formats={formats}
                    className="h-64 mb-10" 
                    style={{ border: 'none' }}
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Highlights (Bullet Points)</label>
                <div className="space-y-2">
                  {highlights.map((point, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                      <input 
                        type="text" 
                        value={point}
                        onChange={(e) => handleHighlightChange(index, e.target.value)}
                        placeholder="Add a key highlight..."
                        className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm"
                      />
                      <button 
                        type="button" 
                        onClick={() => removeHighlight(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={addHighlight}
                    className="mt-2 flex items-center space-x-1 text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors px-2 py-1"
                  >
                    <Plus size={16} /> <span>Add Highlight</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Speaker Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-3">Speaker Information</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Speaker Name</label>
                  <input 
                    type="text" 
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Speaker Photo</label>
                {speakerPhotoUrl ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto md:mx-0">
                    <img src={speakerPhotoUrl} alt="Speaker" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setSpeakerPhotoUrl('')}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => speakerPhotoRef.current?.click()}
                    className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-slate-50 mx-auto md:mx-0 transition-colors"
                  >
                    <input type="file" ref={speakerPhotoRef} onChange={(e) => handleFileUpload(e, 'speaker')} className="hidden" />
                    {speakerUploading ? (
                      <span className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                    ) : <ImageIcon className="text-slate-400" size={24} />}
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/3">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Speaker Bio</label>
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white h-48">
                  <ReactQuill 
                    theme="snow" 
                    value={speakerDetails} 
                    onChange={setSpeakerDetails} 
                    className="h-32"
                    style={{ border: 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media & Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-3">Media & Gallery</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Main Event Banner <span className="text-red-500">*</span></label>
                {bannerUrl ? (
                  <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex justify-center items-center h-48 md:h-64 group">
                    <img src={bannerUrl} alt="Banner Preview" className="h-full object-contain" />
                    <button 
                      type="button" 
                      onClick={() => setBannerUrl('')}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-50"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e, 'banner')} className="hidden" />
                    {uploading ? (
                      <span className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></span>
                    ) : <UploadCloud className="text-blue-500 mb-3" size={32} />}
                    <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-1">Recommended size: 1200x630px</p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">Event Gallery Images</label>
                  <button
                    type="button"
                    onClick={() => galleryRef.current?.click()}
                    className="text-sm bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-200 font-medium transition-colors flex items-center space-x-1"
                  >
                    <Plus size={16} /> <span>Add Images</span>
                  </button>
                  <input type="file" multiple ref={galleryRef} onChange={(e) => handleFileUpload(e, 'gallery')} className="hidden" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group bg-slate-100">
                      <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                  {galleryUploading && (
                    <div className="aspect-video rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50">
                      <span className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                    </div>
                  )}
                  {galleryImages.length === 0 && !galleryUploading && (
                    <div className="col-span-full py-8 text-center border-2 border-dashed border-slate-200 rounded-lg text-slate-500 text-sm bg-slate-50/50">
                      No images added to gallery yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-3">Organization & Setup</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm text-slate-600 bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                <input 
                  type="date" 
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm text-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Time</label>
                <input 
                  type="text" 
                  placeholder="e.g., 10:00 AM - 05:00 PM"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Venue Location</label>
                <textarea 
                  rows={3}
                  value={eventVenue}
                  placeholder="e.g., Adma Ventures Auditorium, Chennai"
                  onChange={(e) => setEventVenue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Google Maps Link (Optional)</label>
                <input 
                  type="url" 
                  value={venueMapLink}
                  onChange={(e) => setVenueMapLink(e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
                {venueMapLink && (
                  <div className="mt-2 text-xs text-blue-600">
                    <a href={venueMapLink} target="_blank" rel="noreferrer" className="hover:underline flex items-center space-x-1">
                      <span>Preview Map Link</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Registration Link</label>
                <input 
                  type="url" 
                  value={registrationLink}
                  onChange={(e) => setRegistrationLink(e.target.value)}
                  placeholder="https://docs.google.com/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
                <p className="text-xs text-slate-400 mt-1.5">Google form or ticket purchase link</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="lg:col-span-3 flex justify-end space-x-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <button 
            type="button"
            onClick={(e) => handleSubmit(e, 'draft')}
            className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3 rounded-lg font-medium transition-all shadow-sm border border-slate-200"
          >
            <Save size={18} />
            <span>Save Draft</span>
          </button>
          <button 
            type="button"
            onClick={(e) => handleSubmit(e, 'published')}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-sm"
          >
            <CheckCircle2 size={18} />
            <span>{isEditing ? 'Update & Publish' : 'Publish'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
