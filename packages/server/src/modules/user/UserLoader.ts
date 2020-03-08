import { DataLoaderKey, GraphQLContext } from '../../types';

import UserModel, { IUser } from './UserModel';

import { mongooseLoader } from '@entria/graphql-mongoose-loader';

import DataLoader from 'dataloader';
import { Types } from 'mongoose';

export default class User {
  id: string;
  _id: string;
  name: string;
  email: string | null | undefined;
  password: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IUser, { user }: GraphQLContext) {
    this.id = data.id || data._id;
    this._id = data._id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    if (user && user._id.equals(data._id)) {
      this.email = data.email;
      this.password = data.password;
    }
  }
}

const viewerCanSee = () => true;

export const getLoader = () => new DataLoader<DataLoaderKey, IUser>(ids => mongooseLoader(UserModel, ids as any));

export const load = async (context: GraphQLContext, id: DataLoaderKey) => {
  if (!id) {
    return null;
  }

  try {
    const data = await context.dataloaders.UserLoader.load(id);

    if (!data) {
      return null;
    }

    return viewerCanSee() ? new User(data, context) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.UserLoader.clear(id.toString());

export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: IUser) =>
  dataloaders.UserLoader.prime(id.toString(), data);

export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IUser) =>
  clearCache(context, id) && primeCache(context, id, data);
