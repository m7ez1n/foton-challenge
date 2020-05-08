import React, { useState, useEffect} from 'react';
import { graphql, usePagination, useQuery } from 'relay-hooks';
import Task from './Task';

interface Props {
  query: any;
}

const TaskList: React.FC<Props> = props => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [query, { isLoading, hasMore, loadMore, refetchConnection }] = usePagination<TaskList_query$key>(
    graphql`
      fragment TaskList_query on Query
        @argumentDefinitions(
          first: { type: "Int!", defaultValue: 10 }
          cursor: { type: String }
          search: { type: String }
        ) {
        tasks(first: $first, after: $cursor, search: $search) @connection(key: "TaskList_tasks") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              ...Task_task
            }
          }
        }
      }
    `,
    props.query,
  );

  const refetchQuery = graphql`
    query TaskListPaginationQuery($first: Int!, $cursor: String, $search: String) {
      ...TaskList_query @arguments(first: $first, cursor: $cursor, search: $search)
    }
  `;
  
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default TaskList;
