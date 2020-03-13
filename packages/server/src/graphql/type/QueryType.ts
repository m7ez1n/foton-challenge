import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs, fromGlobalId, globalIdField } from 'graphql-relay';

import { NodeField, NodesField } from '../../interface/NodeInterface';

import { GraphQLContext } from '../../types';
import * as UserLoader from '../../modules/user/UserLoader';
import UserType from '../../modules/user/UserType';
import TaskType, { TaskConnection } from '../../modules/tasks/TaskType';
import { TaskLoader } from '../../loader';

export default new GraphQLObjectType<any, GraphQLContext, any>({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    id: globalIdField('Query'),
    node: NodeField,
    nodes: NodesField,

    user: {
      type: UserType,
      resolve: (obj, args, context) => (context.user ? UserLoader.load(context, context.user._id) : null),
    },

    tasks: {
      type: GraphQLNonNull(TaskConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, context) => await TaskLoader.LoadTasks(context, args),
    },

    task: {
      type: TaskType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }, context) => await TaskLoader.load(context, fromGlobalId(id).id),
    },
  }),
});
