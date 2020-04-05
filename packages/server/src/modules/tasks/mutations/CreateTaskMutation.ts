import { GraphQLString, GraphQLNonNull } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import TaskModel from '../TaskModel';
import * as TaskLoader from '../TaskLoader';
import TaskType from '../TaskType';

export default mutationWithClientMutationId({
  name: 'CreateTask',
  inputFields: {
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ title, description }, { user }) => {
    if (!user) return { error: 'You should be authenticated' };

    const { id } = await TaskModel.create({ title, description });

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
