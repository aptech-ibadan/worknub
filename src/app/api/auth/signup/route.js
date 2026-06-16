import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    roles: {
      type: [String],
      default: ['admin'],
      enum: ['admin', 'staff', 'manager'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // auto-manages createdAt and updatedAt — no pre-save hook needed
  }
);

// Prevent model recompilation error in development
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;