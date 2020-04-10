import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import TaskModel from '../TaskModel';
import * as TaskLoader from '../TaskLoader';
import TaskType from '../TaskType';

export default mutationWithClientMutationId({
  name: 'UpdateTask',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id, title, description }, { user }) => {
    if (!user) return { error: 'You should be authenticated' };

    let task;
    try {
      task = await TaskModel.findById(id);
    } catch (error) {
      return { error: 'Task does not exists' };
    }

    if (!task) return { error: 'Task does not exists' };

    task.title = title;
    task.description = description;

    await task.save();

    return { id };
  },
  outputFields: {
    task: {
      type: TaskType,
      resolve: async ({ id }, args, context) => TaskLoader.load(context, id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
