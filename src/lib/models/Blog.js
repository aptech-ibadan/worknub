// lib/models/Blog.js
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  readTime: {
    type: String,
    required: [true, 'Read time is required'],
  },
  imageHex: {
    type: String,
    default: '',
  },
  imageMime: {
    type: String,
    default: '',
  },
  published: {
    type: Boolean,
    default: true, // Default to published
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate slug from title before saving
BlogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 200);
  }
  this.updatedAt = new Date();
  next();
});

// Add indexes for better query performance
BlogSchema.index({ createdAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ published: 1 });
BlogSchema.index({ slug: 1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;