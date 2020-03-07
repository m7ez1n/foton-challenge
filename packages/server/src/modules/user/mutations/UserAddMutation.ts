import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import User from '../UserModel';

import * as UserLoader from '../UserLoader';
import { UserConnection } from '../UserType';

interface UserAddArgs {
  name: string;
  email: string;
  password: string;
}

const mutation = mutationWithClientMutationId({
  name: 'UserAdd',
  inputFields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: UserAddArgs) => {
    const { name, email, password } = args;

    const newUser = await new User({
      name,
      email,
      password,
    }).save();

    return {
      id: newUser._id,
      error: null,
    };
  },
  outputFields: {
    userEdge: {
      type: UserConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const newUser = await UserLoader.load(context, id);

        if (!newUser) {
          return null;
        }

        return {
          cursor: toGlobalId('User', newUser._id),
          node: newUser,
        };
      },
    },
  },
});

export default {
  ...mutation,
};
