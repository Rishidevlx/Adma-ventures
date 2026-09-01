import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { UploadCloud, CheckCircle2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEvent() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      fetchEventDetails();
    }
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/events/${id}`);
      const data = await res.json();
      if (data.success && data.event) {
        setTitle(data.event.title);
        setSlug(data.event.slug);
        setContent(data.event.content);
        setBannerUrl(data.event.banner_url);
      }
    } catch (error) {
      toast.error('Failed to fetch event details');
    }
  };

  // Custom modules for Quill toolbar
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
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image'
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'adma_preset');

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dmhytkejj';
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        setBannerUrl(data.secure_url);
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (err: any) {
      toast.error('Image upload failed: ' + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content || !bannerUrl) {
      toast.error('Please fill in all required fields including banner image');
      return;
    }
    
    const loadingToast = toast.loading(isEditing ? 'Updating event...' : 'Publishing event...');
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
        body: JSON.stringify({ title, slug, content, bannerUrl })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to save event');
      }

      toast.success(isEditing ? 'Event updated successfully!' : 'Event post created successfully!', { id: loadingToast });
      
      // Redirect to all events
      navigate('/admin/events');
    } catch (error: any) {
      toast.error(error.message || 'Error saving event', { id: loadingToast });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">{isEditing ? 'Edit Post' : 'Add Post'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
        
        {/* Title & Slug */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                // Auto-generate slug
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
              }}
              placeholder="Enter event title"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Slug <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-slate-50"
            />
          </div>
        </div>

        {/* Banner Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Event Banner / Thumbnail <span className="text-red-500">*</span>
          </label>
          
          {bannerUrl ? (
            <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex justify-center items-center h-64 group">
              <img src={bannerUrl} alt="Banner Preview" className="h-full object-contain" />
              <button 
                type="button" 
                onClick={() => setBannerUrl('')}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden" 
              />
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {uploading ? (
                  <span className="w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin"></span>
                ) : (
                  <UploadCloud className="text-blue-500" size={24} />
                )}
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-blue-600">{uploading ? 'Uploading...' : 'Click to upload'}</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div className="pb-8">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Event Description <span className="text-red-500">*</span>
          </label>
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <ReactQuill 
              theme="snow" 
              value={content} 
              onChange={setContent} 
              modules={modules}
              formats={formats}
              className="h-64 mb-10" // mb-10 is needed because ReactQuill's toolbar is absolute or content overflows sometimes
              style={{ border: 'none' }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button 
            type="submit"
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm active:scale-95"
          >
            <CheckCircle2 size={18} />
            <span>{isEditing ? 'Update Event' : 'Publish Event'}</span>
          </button>
        </div>
        
      </form>
    </div>
  );
}
