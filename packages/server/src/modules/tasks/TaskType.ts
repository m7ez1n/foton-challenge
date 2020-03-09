import { NodeInterface } from '../../interface/NodeInterface';

import { connectionDefinitions } from '../../graphql/connection/CustomConnectionType';

import { GraphQLContext } from '../../types';

import Task from './TaskLoader';

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';

import { globalIdField } from 'graphql-relay';

type ConfigType = GraphQLObjectTypeConfig<Task, GraphQLContext>;

const TaskTypeConfig: ConfigType = {
  name: 'Tasks',
  description: 'Task data',
  fields: {
    id: globalIdField('Task'),
    _id: {
      type: GraphQLID,
      resolve: task => task._id,
    },
    title: {
      type: GraphQLString,
      resolve: task => task.title,
    },
    description: {
      type: GraphQLString,
      resolve: task => task.description,
    },
    createdAt: {
      type: GraphQLString,
      resolve: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: ({ createdAt }) => (createdAt ? createdAt.toISOString() : null),
    },
  },
  interfaces: () => [NodeInterface],
};

const TaskType = new GraphQLObjectType(TaskTypeConfig);

export const TaskConnection = connectionDefinitions({
  name: 'Task',
  //@ts-ignore
  nodeType: GraphQLNonNull(TaskType),
});

export default TaskType;
