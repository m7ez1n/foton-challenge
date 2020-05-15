import React, { useState, useEffect} from 'react';
import { usePagination, useQuery } from 'relay-hooks';
import { graphql, useRefetchableFragment } from 'react-relay/hooks';
import Task from './Task';

interface Props {
  query: any;
}

import { TaskList_query$key } from './__generated__/TaskList_query.graphql';

const TaskList: React.FC<Props> = props => {

  const [data, refetch] = useRefetchableFragment<TaskList_query$key, _>(
    graphql`
      fragment TaskList_query on Query
      @argumentDefinitions(first: { type: "Int!", defaultValue: 10 }, search: { type: String }) {
        tasks(first: $first, after: $cursor, search: $search) @connection(key: "TaskList_tasks", filters: []) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              description
            }
          }
        }
      }
    `,
    props.query,
  );

  return (
    <div>
      <h1>{props.query.title}</h1>
    </div>
  );
};

export default TaskList;
