"use client";
import { useState, useEffect, useCallback } from 'react';
import {
  FiEdit2, FiTrash2, FiPlus, FiX, FiImage,
  FiLoader, FiCalendar, FiClock, FiTag, FiAlertCircle, FiCheckCircle
} from 'react-icons/fi';

const CATEGORIES = ['Productivity', 'Trends', 'Networking', 'Future of Work', 'Announcements'];

const EMPTY_FORM = {
  title: '', excerpt: '', content: '',
  category: 'Productivity', date: '', readTime: '5 min read',
  imageHex: '', imageMime: '',
};

/* ── helpers ── */
function imageToDataURL(imageHex, mime) {
  if (!imageHex || !mime) return null;
  try {
    // Detect base64 vs hex:
    // Base64 uses characters outside 0-9a-fA-F (like +, /, =, uppercase beyond F)
    // A simple heuristic: if it contains any char not in [0-9a-fA-F], treat as base64
    const isBase64 = /[^0-9a-fA-F]/.test(imageHex.replace(/[\r\n\s]/g, ''));
    if (isBase64) {
      // Already base64 string — use directly
      return `data:${mime};base64,${imageHex}`;
    }
    // It's a hex string — convert bytes to base64
    const bytes = new Uint8Array(imageHex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
    return `data:${mime};base64,${btoa(binary)}`;
  } catch {
    return null;
  }
}

function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.readAsDataURL(file);
    r.onload  = () => res(r.result);
    r.onerror = rej;
  });
}

/* ── sub-components ── */
function BlogImage({ blog, className = "w-full h-full object-cover" }) {
  const [error, setError] = useState(false);
  const src = !error && blog.imageHex && blog.imageMime
    ? imageToDataURL(blog.imageHex, blog.imageMime)
    : null;

  if (!src || error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-worknub-green/10 to-worknub-mint flex flex-col items-center justify-center gap-1.5">
        <FiImage className="text-worknub-green/50" size={24} />
        <span className="text-[10px] text-gray-400 font-medium">No image</span>
      </div>
    );
  }
  return <img src={src} alt={blog.title} className={className} onError={() => setError(true)} />;
}

function CategoryBadge({ category }) {
  const colors = {
    'Productivity':   'bg-blue-50 text-blue-600 border-blue-100',
    'Trends':         'bg-purple-50 text-purple-600 border-purple-100',
    'Networking':     'bg-worknub-green/10 text-worknub-green border-worknub-green/20',
    'Future of Work': 'bg-orange-50 text-orange-600 border-orange-100',
    'Announcements':  'bg-red-50 text-red-600 border-red-100',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.05em] uppercase px-2.5 py-1 rounded-full border ${colors[category] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
      <FiTag size={9} />
      {category}
    </span>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold max-w-sm ${
      type === 'success' ? 'bg-worknub-green text-white' : 'bg-red-500 text-white'
    }`}>
      {type === 'success' ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><FiX size={14} /></button>
    </div>
  );
}

/* ── main component ── */
export default function BlogView() {
  const [blogs,         setBlogs]         = useState([]);
  const [isCreating,    setIsCreating]    = useState(false);
  const [editingBlog,   setEditingBlog]   = useState(null);
  const [formData,      setFormData]      = useState(EMPTY_FORM);
  const [imageFile,     setImageFile]     = useState(null);
  const [imagePreview,  setImagePreview]  = useState(null);
  const [message,       setMessage]       = useState('');
  const [messageType,   setMessageType]   = useState('success');
  const [loading,       setLoading]       = useState(false);
  const [fetching,      setFetching]      = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedBlog,  setExpandedBlog]  = useState(null);

  /* ── fetch ── */
  const fetchBlogs = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/admin/blogs', { credentials: 'same-origin' });
      if (res.ok) setBlogs((await res.json()).blogs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  /* ── submit ── */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let imageHex  = formData.imageHex  || '';
      let imageMime = formData.imageMime || '';

      if (imageFile) {
        const b64 = await fileToBase64(imageFile);
        // Store only the base64 portion (after the comma)
        imageHex  = b64.split(',')[1];
        imageMime = imageFile.type;
      }

      const body = {
        ...formData,
        imageHex,
        imageMime,
        date: formData.date || new Date().toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        }),
      };

      const res = await fetch(
        editingBlog ? `/api/admin/blogs?id=${editingBlog._id}` : '/api/admin/blogs',
        {
          method:      editingBlog ? 'PUT' : 'POST',
          headers:     { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body:        JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      setMessage(editingBlog ? 'Post updated!' : 'Post published!');
      setMessageType('success');
      resetForm();
      fetchBlogs();
    } catch (err) {
      setMessage(err.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  /* ── delete ── */
  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: 'DELETE', credentials: 'same-origin',
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to delete');
      setMessage('Post deleted.');
      setMessageType('success');
      setDeleteConfirm(null);
      fetchBlogs();
    } catch (err) {
      setMessage(err.message);
      setMessageType('error');
    }
  }

  /* ── edit ── */
  function handleEdit(blog) {
    setEditingBlog(blog);
    setFormData({
      title:     blog.title     || '',
      excerpt:   blog.excerpt   || '',
      content:   blog.content   || '',
      category:  blog.category  || 'Productivity',
      date:      blog.date      || '',
      readTime:  blog.readTime  || '5 min read',
      imageHex:  blog.imageHex  || '',
      imageMime: blog.imageMime || '',
    });
    setImagePreview(imageToDataURL(blog.imageHex, blog.imageMime));
    setImageFile(null);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── reset ── */
  function resetForm() {
    setFormData(EMPTY_FORM);
    setImageFile(null);
    setImagePreview(null);
    setEditingBlog(null);
    setIsCreating(false);
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(await fileToBase64(file));
  }

  const field = (name, value, handler) => ({
    name, value,
    onChange: e => handler(e.target.value),
  });

  const inputCls = "mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/15 transition-shadow bg-white";

  return (
    <div className="px-0 sm:px-4 py-4 sm:py-5  mx-auto">

      <Toast message={message} type={messageType} onClose={() => setMessage('')} />

      {/* ── Header ── */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-worknub-dark tracking-[-0.01em]">
            Blog Management
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">Create, edit, and manage your posts</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-worknub-green/10 px-3.5 py-1.5 text-sm font-bold text-worknub-green">
            {blogs.length} posts
          </span>
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-worknub-green px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-worknub-green/20 hover:bg-[#3aad35] transition-colors whitespace-nowrap"
            >
              <FiPlus size={16} /> New Post
            </button>
          )}
        </div>
      </div>

      {/* ── Create / Edit Form ── */}
      {isCreating && (
        <div className="mb-5 rounded-3xl border border-gray-100 bg-white shadow-lg overflow-hidden">
          {/* Form header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/60">
            <h3 className="text-base font-extrabold text-worknub-dark">
              {editingBlog ? 'Edit Post' : 'New Blog Post'}
            </h3>
            <button
              onClick={resetForm}
              className="rounded-xl p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-5 space-y-4">

            {/* Title + Category */}
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title *</span>
                <input
                  {...field('title', formData.title, v => setFormData(p => ({ ...p, title: v })))}
                  required placeholder="Your blog title…"
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category *</span>
                <select
                  {...field('category', formData.category, v => setFormData(p => ({ ...p, category: v })))}
                  required className={inputCls}
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </label>
            </div>

            {/* Excerpt */}
            <label className="block">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Excerpt *</span>
              <textarea
                {...field('excerpt', formData.excerpt, v => setFormData(p => ({ ...p, excerpt: v })))}
                rows={2} required placeholder="Short description shown in blog listing…"
                className={`${inputCls} resize-none`}
              />
            </label>

            {/* Content */}
            <label className="block">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Content *</span>
              <textarea
                {...field('content', formData.content, v => setFormData(p => ({ ...p, content: v })))}
                rows={7} required placeholder="Write your blog content here…"
                className={`${inputCls} resize-y font-mono text-[13px]`}
              />
            </label>

            {/* Date + ReadTime + Image */}
            <div className="grid sm:grid-cols-3 gap-4">
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FiCalendar size={11} /> Date
                </span>
                <input
                  {...field('date', formData.date, v => setFormData(p => ({ ...p, date: v })))}
                  placeholder="June 16, 2026" className={inputCls}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FiClock size={11} /> Read Time
                </span>
                <input
                  {...field('readTime', formData.readTime, v => setFormData(p => ({ ...p, readTime: v })))}
                  placeholder="5 min read" className={inputCls}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FiImage size={11} /> Featured Image
                </span>
                <input
                  type="file" accept="image/*" onChange={handleImageChange}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-worknub-green/10 file:px-3 file:py-1 file:text-xs file:font-bold file:text-worknub-green hover:file:bg-worknub-green/20 cursor-pointer"
                />
              </label>
            </div>

            {/* Image preview */}
            {imagePreview && (
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-worknub-mint border border-worknub-green/20">
                <img
                  src={imagePreview} alt="Preview"
                  className="w-20 h-20 object-cover rounded-xl border-2 border-white shadow-md"
                />
                <div>
                  <p className="text-sm font-bold text-worknub-dark">Image ready</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {imageFile ? imageFile.name : 'Existing image'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      setFormData(p => ({ ...p, imageHex: '', imageMime: '' }));
                    }}
                    className="mt-2 text-xs text-red-400 hover:text-red-600 font-medium"
                  >
                    Remove image
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="submit" disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-worknub-green px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-worknub-green/25 hover:bg-[#3aad35] transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading
                  ? <><FiLoader className="animate-spin" size={14} /> Saving…</>
                  : editingBlog ? 'Update Post' : 'Publish Post'
                }
              </button>
              <button
                type="button" onClick={resetForm}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Blog List ── */}
      <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-worknub-dark">All Posts</h3>
          {!fetching && blogs.length > 0 && (
            <span className="text-xs text-gray-400">{blogs.length} total</span>
          )}
        </div>

        {fetching ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <FiLoader className="animate-spin text-worknub-green" size={28} />
            <span className="text-sm text-gray-400">Loading posts…</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 bg-worknub-green/10 rounded-2xl flex items-center justify-center">
              <FiImage className="text-worknub-green" size={28} />
            </div>
            <div className="text-center">
              <p className="font-bold text-worknub-dark">No posts yet</p>
              <p className="text-sm text-gray-400 mt-1">Create your first blog post to get started.</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-worknub-green px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-worknub-green/20 hover:bg-[#3aad35] transition-colors"
            >
              <FiPlus size={15} /> New Post
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {blogs.map((blog) => {
              const id         = blog._id || blog.id;
              const isExpanded = expandedBlog === id;

              return (
                <article key={id} className="transition-colors hover:bg-gray-50/40">

                  {/* ── Card body ── */}
                  <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-5">

                    {/* Thumbnail — full width on mobile, square on desktop */}
                    <div className="w-full h-44 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                      <BlogImage blog={blog} className="w-full h-full object-cover" />
                    </div>

                    {/* Content + actions row */}
                    <div className="flex flex-1 min-w-0 gap-3">
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        {/* Category + meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <CategoryBadge category={blog.category} />
                          <div className="flex items-center gap-2 text-[11px] text-gray-400 flex-wrap">
                            <span className="flex items-center gap-1">
                              <FiCalendar size={10} />
                              {blog.date || new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <FiClock size={10} />{blog.readTime}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <p className="font-extrabold text-worknub-dark text-[15px] leading-snug mb-1 line-clamp-1">
                          {blog.title}
                        </p>

                        {/* Excerpt */}
                        <p className={`text-[13px] text-gray-500 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                          {blog.excerpt}
                        </p>
                        {blog.excerpt?.length > 100 && (
                          <button
                            onClick={() => setExpandedBlog(isExpanded ? null : id)}
                            className="text-[12px] text-worknub-green font-semibold mt-1 hover:underline"
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-row sm:flex-col items-start sm:items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="rounded-xl p-2 text-gray-400 hover:bg-worknub-green/10 hover:text-worknub-green transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(id)}
                          className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded content preview */}
                  {isExpanded && blog.content && (
                    <div className="px-4 sm:px-5 pb-4">
                      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Content preview
                        </p>
                        <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-6">
                          {blog.content}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Delete confirmation */}
                  {deleteConfirm === id && (
                    <div className="mx-4 sm:mx-5 mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-red-50 border border-red-100 p-3.5">
                      <FiAlertCircle className="text-red-500 shrink-0" size={16} />
                      <p className="text-sm text-red-700 font-medium flex-1">
                        Delete <strong>"{blog.title}"</strong>? This cannot be undone.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(id)}
                          className="rounded-xl bg-red-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-colors whitespace-nowrap"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="rounded-xl border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}