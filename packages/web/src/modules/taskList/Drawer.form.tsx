import React from 'react';
import * as Yup from 'yup';
import { useMutation, graphql } from 'relay-hooks';
import { toast } from 'react-toastify';

import { Form, Input } from 'formik-antd';
import { Drawer, Button } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import styled from 'styled-components';

import task from '../../assets/task.svg';

import { DrawerFormMutation, DrawerFormMutationResponse } from './__generated__/DrawerFormMutation.graphql';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const StyledFooter = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;

  button:first-child {
    margin-right: 8px;
  }
`;

const TaskDrawer: React.FC<Props> = ({ open, setOpen }) => {
  const [mutate, { loading }] = useMutation<DrawerFormMutation>(
    graphql`
      mutation DrawerFormMutation($input: CreateTaskInput!) {
        CreateTaskMutation(input: $input) {
          task {
            _id
            id
            title
            description
          }
          error
        }
      }
    `,
    {
      onCompleted: async ({ CreateTaskMutation }: DrawerFormMutationResponse) => {
        if (CreateTaskMutation && CreateTaskMutation.error && !CreateTaskMutation.task) {
          toast.error(`❌ Creation task failed, ${CreateTaskMutation!.error}`);
        } else {
          console.log('sla qq to fznd mano', CreateTaskMutation?.task!.id);
        }
      },
      onError: () => {
        toast.error('❌ Creation failed, network request failed');
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: input => {
      mutate({
        variables: {
          input,
        },
      });
    },
  });

  const handleClose = () => setOpen(false);

  return (
    <Drawer
      title="Create a new task"
      onClose={handleClose}
      visible={open}
      width={500}
      bodyStyle={{ paddingBottom: 20 }}
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
          <StyledFooter>
            <Button onClick={handleClose}>Cancel</Button>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </StyledFooter>
        </Form>
      </FormikProvider>
    </Drawer>
  );
};

export default TaskDrawer;
