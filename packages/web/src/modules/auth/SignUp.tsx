import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation, graphql } from 'relay-hooks';
import history from '../../routes/history';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import { SignUpMutation, SignUpMutationResponse } from './__generated__/SignUpMutation.graphql';
import AuthForm from './AuthForm';

const SignUp: React.FC = () => {
  const [mutate, { loading }] = useMutation<SignUpMutation>(
    graphql`
      mutation SignUpMutation($input: UserRegisterMutationInput!) {
        UserRegisterMutation(input: $input) {
          token
          error
        }
      }
    `,
    {
      onCompleted: async ({ UserRegisterMutation }: SignUpMutationResponse) => {
        if (UserRegisterMutation!.error && !UserRegisterMutation!.token) {
          toast.error(`❌ Registration failed, ${UserRegisterMutation!.error}`);
        } else {
          localStorage.setItem('token', UserRegisterMutation!.token!);
          history.push('/todo');
        }
      },
      onError: () => {
        toast.error('❌ Registration failed, network request failed');
      },
    },
  );

  const fields = [
    {
      name: 'name',
      placeholder: 'Name',
      icon: <UserOutlined />,
    },
    {
      name: 'email',
      placeholder: 'Email',
      icon: <MailOutlined />,
    },
    {
      name: 'password',
      placeholder: 'Password',
      typePassword: true,
      icon: <LockOutlined />,
    },
  ];

  const link = [
    {
      to: '/',
      text: 'login ago!',
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('E-mail needs to be a valid e-mail')
        .required('E-mail is required'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be more than 4')
        .max(16, "Password can't be more than 16"),
    }),
    onSubmit: input => {
      mutate({
        variables: {
          input,
        },
      });
    },
  });

  return <AuthForm formik={formik} loading={loading} fields={fields} returnLink={link} buttonText="Signup" />;
};

export default SignUp;
