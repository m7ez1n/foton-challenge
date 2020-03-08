import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      description: 'Username',
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
    acess: {
      type: Boolean,
      default: true,
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
  encryptPassword: (password: string | undefined) => string;
  acess: boolean;
  acessAuthorized: (plainTextPassword: string) => boolean;
  createdAt: Date;
  updatedAt: Date;
}

Schema.pre<IUser>('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

Schema.methods = {
  acessAuthorized(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

const UserModel: Model<IUser> = mongoose.model<IUser, Model<IUser>>('User', Schema);

export default UserModel;
