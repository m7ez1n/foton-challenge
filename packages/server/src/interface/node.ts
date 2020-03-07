import {
  GraphQLFieldConfig,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLTypeResolver,
} from 'graphql/type/definition';

import { GraphQLID } from 'graphql/type/scalars';

interface GraphQLNodeDefinitions<TContext> {
  nodeInterface: GraphQLInterfaceType;
  nodeField: GraphQLFieldConfig<any, TContext, { id: string }>;
  nodesField: GraphQLFieldConfig<any, TContext, { ids: string[] }>;
}

export function nodeDefinitions<TContext>(
  idFetcher: (id: string, context: TContext, info: GraphQLResolveInfo) => any,
  typeResolver?: GraphQLTypeResolver<any, TContext> | undefined,
): GraphQLNodeDefinitions<TContext> {
  const nodeInterface = new GraphQLInterfaceType({
    name: 'Node',
    description: 'An object with an ID',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the object.',
      },
    }),
    resolveType: typeResolver,
  });

  return {
    nodeInterface,
    nodeField: {
      description: 'Fetches an object given its ID',
      type: nodeInterface,
      args: {
        id: {
          type: GraphQLID,
          description: 'The ID of an object',
        },
      },
      resolve: (obj, { id }, context, info) => (id ? idFetcher(id, context, info) : null),
    },
    nodesField: {
      description: 'Fetches objects given their IDs',
      type: new GraphQLNonNull(new GraphQLList(nodeInterface)),
      args: {
        ids: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
          description: 'The IDs of objects',
        },
      },
      resolve: (obj, { ids }, context, info) =>
        Promise.all(ids.map(id => Promise.resolve(idFetcher(id, context, info)))),
    },
  };
}
