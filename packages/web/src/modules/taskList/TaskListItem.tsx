import React from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import styled from 'styled-components';
import { formatDistance, parseISO } from 'date-fns';

import { Card } from 'antd';

interface Props {
  tasksItem: any;
}

const CardStyle = styled(Card)`
  width: 300px;
`;

const CardContent = styled.p`
  color: #666666;
`;

const CardSpan = styled.span`
  color: #ee4d64;
`;

const TaskListItem: React.FC<Props> = props => {
  const task = useFragment(
    graphql`
      fragment TaskListItem_task on Query {
        tasks {
          edges {
            node {
              id
              title
              description
              createdAt
            }
          }
        }
      }
    `,
    props.tasksItem,
  );

  const formatDate = React.useMemo(() => formatDistance(parseISO(task.createdAt!), new Date()), [task.createdAt]);

  return (
    <CardStyle title={task.title}>
      <CardContent>{task.description}</CardContent>
      <CardSpan>{formatDate}</CardSpan>
    </CardStyle>
  );
};

export default TaskListItem;
