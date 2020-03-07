import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs, fromGlobalId, globalIdField } from 'graphql-relay';

import { NodeField, NodesField } from '../../interface/NodeInterface';

import { GraphQLContext } from '../../types';
import * as UserLoader from '../../modules/user/UserLoader';
import UserType, { UserConnection } from '../../modules/user/UserType';

export default new GraphQLObjectType<any, GraphQLContext, any>({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    id: globalIdField('Query'),
    node: NodeField,
    nodes: NodesField,

    /* User */
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }, context) => await UserLoader.load(context, fromGlobalId(id).id),
    },
    users: {
      type: GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, context) => await UserLoader.loadEvents(context, args),
    },
    /* User */
  }),
});
