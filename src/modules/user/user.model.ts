import mongoose from 'mongoose';
import {User} from '../../types/user.type.js';

export interface UserDocument extends User, mongoose.Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [1, 'Name is too short. Min length for name is 1'],
    maxLength: [15, 'Name is too long. Max length for name is 15'],
    required: true
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true
  },
  avatarPath: {
    type: String,
    minlength: [5, 'Min length for avatar path is 5'],
    match: [/^\w*(.jpg|.png)$/, 'Format of avatar image is incorrect. Supported formats are ".jpg" and ".png"'],
    required: false
  },
  password: {
    type: String,
    minLength: [6, 'Password is too short. Min length for password is 6'],
    maxLength: [12, 'Password is too long. Max length for password is 12'],
    required: true
  },
  userType: String
}, {
  timestamps: true
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
