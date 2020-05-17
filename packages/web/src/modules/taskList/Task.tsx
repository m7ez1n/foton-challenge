import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFragment, graphql } from 'relay-hooks';
import { formatDistance, parseISO } from 'date-fns';

import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';

import { Button } from 'antd';

import { Header } from '../common';
import TaskDrawer from '../create/Drawer';

import { Task_task$key } from './__generated__/Task_task.graphql';

interface Props {
  task: Task_task$key;
}

const Task: React.FC<Props> = props => {
  const history = useHistory();

  const [open, setOpen] = React.useState<boolean>(false);

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

  return (
    <div>
      <Header />
      <h1>Alou caraio</h1>
      <Button type="primary" onClick={handleOpen} size="large" icon={<PlusOutlined />}>
        Add new task
      </Button>
      <TaskDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default Task;
