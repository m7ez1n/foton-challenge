import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFragment, graphql } from 'relay-hooks';
import { formatDistance, parseISO } from 'date-fns';
import styled from 'styled-components';

import { Button, Card, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { Header } from '../common';
import TaskDrawer from '../create/Drawer';

import { Task_task$key } from './__generated__/Task_task.graphql';

interface Props {
  task: Task_task$key;
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

const Task: React.FC<Props> = props => {
  const [open, setOpen] = React.useState<boolean>(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const task = useFragment<Task_task$key>(
    graphql`
      fragment Task_task on Tasks {
        id
        title
        description
        createdAt
      }
    `,
    props.task,
  );

  const formatDate = React.useMemo(() => formatDistance(parseISO(task.createdAt!), new Date()), [task.createdAt]);

  return (
    <>
      <Header />
      <div>
        <h1>Alou caraio</h1>
        <Button type="primary" onClick={handleOpen} size="large" icon={<PlusOutlined />}>
          Add new task
        </Button>
        <TaskDrawer open={open} setOpen={setOpen} />

        <Row gutter={[8, 32]}>
          <Col span={6}>
            <CardStyle title={task.title}>
              <CardContent>{task.description}</CardContent>
              <CardSpan>{formatDate}</CardSpan>
            </CardStyle>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Task;
