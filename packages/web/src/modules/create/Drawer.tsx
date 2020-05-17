import React from 'react';
import * as Yup from 'yup';
import { useMutation, graphql } from 'relay-hooks';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { Drawer } from 'antd';

import CreateForm from './CreateForm';

import task from '../../assets/task.svg';

import { DrawerFormMutation, DrawerFormMutationResponse } from './__generated__/DrawerFormMutation.graphql';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

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

  const fields = [
    {
      name: 'title',
      placeholder: 'The title of your task',
      label: 'Title',
    },
    {
      name: 'description',
      placeholder: 'The description of your task',
      label: 'Description',
      isTextArea: true,
    },
  ];

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
      <CreateForm loading={loading} fields={fields} handleClose={handleClose} formik={formik} />
    </Drawer>
  );
};

export default TaskDrawer;
