import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFragment, graphql } from 'relay-hooks';
import { formatDistance, parseISO } from 'date-fns';

import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';

import { Task_task$key } from './__generated__/Task_task.graphql';
import { Header } from '../common';
import { Button } from 'antd';
import { TaskDrawer } from './Drawer.form';

interface Props {
  task: Task_task$key;
}

const Task: React.FC<Props> = props => {
  const history = useHistory();

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
      <Button type="primary" size="large" icon={<PlusOutlined />}>
        Add new task
      </Button>
      <TaskDrawer />
    </div>
  );
};

export default Task;
