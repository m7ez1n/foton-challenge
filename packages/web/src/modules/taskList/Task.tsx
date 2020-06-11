import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { usePaginationFragment, graphql } from 'react-relay/hooks';

import { Button, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { Header } from '../common';
import TaskDrawer from '../create/Drawer';

import TaskListItem from './TaskListItem';

import { Task_task$key } from './__generated__/Task_task.graphql';

interface Props {
  task: Task_task$key;
}

const Task: React.FC<Props> = props => {
  const [open, setOpen] = React.useState<boolean>(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const { data, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment Task_task on Tasks
        @argumentDefinitions(cursor: { type: "String" }, count: { type: "Int", defaultValue: 10 })
        @refetchable(queryName: "TaskPaginationQuery") {
        tasks(after: $cursor, first: $count) @connection(key: "Tasks_tasks") {
          edges {
            __id
            node {
              ...TaskListItem_task
            }
          }
        }
      }
    `,
    props.task,
  );

  const loadMore = useCallback(() => {
    if (isLoadingNext) return;

    loadNext(10);
  }, [isLoadingNext, loadNext]);

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
