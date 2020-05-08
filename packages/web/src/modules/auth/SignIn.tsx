import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useMutation, graphql } from 'relay-hooks';
import { useHistory } from 'react-router-dom';

import { SignInMutation, SignInMutationResponse } from './__generated__/SignInMutation.graphql';

import AuthForm from './AuthForm';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const SignIn: React.FC = () => {
  const history = useHistory();

  const [mutate, { loading }] = useMutation<SignInMutation>(
    graphql`
      mutation SignInMutation($input: UserLoginMutationInput!) {
        UserLoginMutation(input: $input) {
          token
          error
        }
      }
    `,
    {
      onCompleted: async ({ UserLoginMutation }: SignInMutationResponse) => {
        if (UserLoginMutation!.error && !UserLoginMutation!.token) {
          toast.error(`❌ Registration failed, ${UserLoginMutation!.error}`);
        } else {
          localStorage.setItem('token', UserLoginMutation!.token!);
          history.push('/todo');
        }
      },
      onError: () => {
        toast.error('❌ Registration failed, network request failed');
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('E-mail needs to be a valid e-mail')
        .required('E-mail is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: input => {
      mutate({
        variables: {
          input,
        },
      });
    },
  });

  const fields = [
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
      to: '/signup',
      text: 'register now!',
    },
  ];

  return <AuthForm formik={formik} loading={loading} fields={fields} returnLink={link} buttonText="Login" />;
};

export default SignIn;
