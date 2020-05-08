import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFragment, graphql } from 'relay-hooks';
import { formatDistance, parseISO } from 'date-fns';

import styled from 'styled-components';

interface Props {
  task: Task_task$key;
}

const Task: React.FC<Props> = (props ) => {
  const history = useHistory();

  const task = useFragment<Task_task$key>(
    graphql`
      fragment Task_task on Task {
        id
        title
        description
        createdAt
      }
    `,
    props.task,
  );

  const formatDate = React.useMemo(() => formatDistance(parseISO(task.createdAt!), new Date()), []);

  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{formatDate}</p>
    </div>
  );
};

export default Task;
