import mongoose, { Document, Model } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      description: 'Username',
      index: true,
      required: true,
    },
    email: {
      type: String,
      description: 'User email',
      required: true,
      index: true,
    },
    password: {
      type: String,
      description: 'User password',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'User',
  },
);

Schema.index({ name: 'text', email: 'text', password: 'text' });

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserModel: Model<IUser> = mongoose.model<IUser, Model<IUser>>('User', Schema);

export default UserModel;
