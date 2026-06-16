import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String, required: true },
  imageHex: { type: String, default: '' },
  imageMime: { type: String, default: '' },
}, {
  timestamps: true,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
