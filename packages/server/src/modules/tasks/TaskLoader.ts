import { DataLoaderKey, GraphQLContext } from '../../types';

import { escapeRegex } from '../../common/utils';

import TaskModel, { ITask } from './TaskModel';

import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import { ConnectionArguments } from 'graphql-relay';
import { Types } from 'mongoose';

export default class Task {
  id: string;
  _id: Types.ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: ITask) {
    this.id = data.id;
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

const viewerCanSee = () => true;

export const getLoader = () => new DataLoader<DataLoaderKey, ITask>(ids => mongooseLoader(TaskModel, ids as any));

export const load = async (context: GraphQLContext, id: DataLoaderKey) => {
  if (!id) {
    return null;
  }

  try {
    const data = await context.dataloaders.TaskLoader.load(id);

    if (!data) {
      return null;
    }

    return viewerCanSee() ? new Task(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.TaskLoader.clear(id.toString());

export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: ITask) =>
  dataloaders.TaskLoader.prime(id.toString(), data);

export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: ITask) =>
  clearCache(context, id) && primeCache(context, id, data);

interface LoadTasksArgs extends ConnectionArguments {
  search?: string;
}

export const LoadProducts = async (context: GraphQLContext, args: LoadTasksArgs) => {
  const conditions: any = {};

  if (args.search) {
    const searchRegex = new RegExp(`${escapeRegex(args.search)}`, 'ig');
    conditions.$or = [{ title: { $regex: searchRegex } }, { description: { $regex: searchRegex } }];
  }

  return connectionFromMongoCursor({
    cursor: TaskModel.find(conditions).sort({ date: 1 }),
    context,
    args,
    loader: load,
  });
};
