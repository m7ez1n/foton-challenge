import { GraphQLObjectType } from 'graphql';

import UserMutations from '../../modules/user/mutations';
import TaskMutations from '../../modules/tasks/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...TaskMutations,
  }),
});
