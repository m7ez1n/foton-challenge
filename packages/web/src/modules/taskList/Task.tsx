/* eslint-disable import/no-unresolved */
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { usePaginationFragment, graphql, usePreloadedQuery } from 'react-relay/hooks';
import { PreloadedQuery } from 'react-relay/lib/relay-experimental/EntryPointTypes';

import { Button, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { Header } from '../common';
import TaskDrawer from '../create/Drawer';

import TaskListItem from './TaskListItem';

import { TaskQuery } from './__generated__/TaskQuery.graphql';

interface Props {
  prepared: {
    taskQuery: PreloadedQuery<TaskQuery>;
  };
}

const Task: React.FC<Props> = props => {
  const [open, setOpen] = React.useState<boolean>(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const data = usePreloadedQuery(
    graphql`
      query TaskQuery {
        ...TaskListItem_task
      }
    `,
    props.prepared.taskQuery,
  );

  return (
    <>
      <Header />
      <div>
        <Button type="primary" onClick={handleOpen} size="large" icon={<PlusOutlined />}>
          Add new task
        </Button>
        <TaskDrawer open={open} setOpen={setOpen} />

        <Row gutter={[8, 32]}>
          <Col span={6}></Col>
        </Row>
      </div>
    </>
  );
};

export default Task;
