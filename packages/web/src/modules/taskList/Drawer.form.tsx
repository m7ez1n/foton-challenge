import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from 'formik-antd';
import { Drawer, Button, Col } from 'antd';
import { FormikProvider, useFormik } from 'formik';

import task from '../../assets/task.svg';

export const TaskDrawer = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: input => console.log('Foi', input),
  });

  return (
    <Drawer
      title="Create a new task"
      width={680}
      onClose={() => console.log('fechando')}
      visible={true}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={() => console.log('fechando')} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => console.log('abrindo')} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <img src={task} alt="representation tasks image" style={{ width: '100%', marginBottom: 30 }} />
      <FormikProvider value={formik}>
        <Form>
          <Form.Item name="title" label="Title">
            <Input size="middle" name="title" placeholder="The title of your task" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea name="description" placeholder="The description of your task" rows={5} />
          </Form.Item>
        </Form>
      </FormikProvider>
    </Drawer>
  );
};
