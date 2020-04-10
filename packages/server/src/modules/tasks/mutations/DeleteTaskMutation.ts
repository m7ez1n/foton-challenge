import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import TaskModel from '../TaskModel';

export default mutationWithClientMutationId({
  name: 'DeleteTask',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id }, { user }) => {
    if (!user) return { error: 'You should be authenticated' };

    let task;
    try {
      task = await TaskModel.findById(id);
    } catch (error) {
      return { error: 'Task does not exists' };
    }

    if (!task) return { error: 'Task does not exists' };

    await task.remove();

    return { message: 'Task deleted with success' };
  },
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
