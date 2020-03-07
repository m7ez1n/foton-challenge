import { connectionDefinitions } from '../../graphql/connection/CustomConnectionType';

import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLContext } from '../../types';

import User from './UserLoader';

import { GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

type ConfigType = GraphQLObjectTypeConfig<User, GraphQLContext>;

const UserTypeConfig: ConfigType = {
  name: 'User',
  description: 'Represents users',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLNonNull(GraphQLString),
      description: 'MongoDB_id',
      resolve: event => event._id.toString(),
    },
    name: {
      type: GraphQLString,
      resolve: event => event.name,
    },
    email: {
      type: GraphQLString,
      resolve: event => event.email,
    },
    password: {
      type: GraphQLString,
      resolve: event => event.password,
    },
    createdAt: {
      type: GraphQLString,
      resolve: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    },
  }),
  interfaces: () => [NodeInterface],
};

const UserType = new GraphQLObjectType(UserTypeConfig);

export const UserConnection = connectionDefinitions({
  name: 'User',
  //TODO verificar error do nodeType
  nodeType: GraphQLNonNull(UserType),
});

export default UserType;
