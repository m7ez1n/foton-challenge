import UserModel from '../UserModel';

import { generateToken } from '../../../common/auth';

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'UserLoginMutation',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    const defaultErrorMessage = 'Invalid credentials';
    if (!user) {
      return {
        error: defaultErrorMessage,
      };
    }

    const correctPassword = user.acessAuthorized(password);

    if (!correctPassword) {
      return {
        error: defaultErrorMessage,
      };
    }

    return {
      token: generateToken(user),
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
