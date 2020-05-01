import React from 'react';
import { toast } from 'react-toastify';
import { useMutation, graphql } from 'relay-hooks';
import history from '../../routes/history';

import { SignInMutation, SignInMutationResponse } from './__generated__/SignInMutation.graphql';

import AuthForm from './AuthForm';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const SignIn: React.FC = () => {
  const [mutation, { loading }] = useMutation<SignInMutation>(
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

  const fields = [
    {
      name: 'email',
      placeholder: 'Email',
      rules: [
        {
          required: true,
          message: 'Please input your email!',
        },
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
      ],
      icon: <MailOutlined />,
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      rules: [
        {
          required: true,
          message: 'Please input your email!',
        },
      ],
      icon: <LockOutlined />,
    },
  ];

  const link = [
    {
      to: '/signup',
      text: 'register now!',
    },
  ];

  return <AuthForm fields={fields} returnLink={link} buttonText="Login" />;
};

export default SignIn;
