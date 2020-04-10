import { fromGlobalId } from 'graphql-relay';

import User, * as UserLoader from '../modules/user/UserLoader';

import Task, * as TaskLoader from '../modules/tasks/TaskLoader';

import UserType from '../modules/user/UserType';

import { GraphQLContext } from '../types';

import TaskType from '../modules/tasks/TaskType';

import { nodeDefinitions } from './node';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  // A method that maps from a global id to an object
  async (globalId, context: GraphQLContext) => {
    const { id, type } = fromGlobalId(globalId);

    if (type === 'User') {
      return UserLoader.load(context, id);
    }

    if (type === 'Task') {
      return TaskLoader.load(context, id);
    }

    // it should not get here
    return null;
  },
  // A method that maps from an object to a type
  obj => {
    if (obj instanceof User) {
      return UserType;
    }

    if (obj instanceof Task) {
      return TaskType;
    }

    // it should not get here
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;
