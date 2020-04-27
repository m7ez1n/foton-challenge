import React from 'react';

import AuthForm from './AuthForm';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const SignUp: React.FC = () => {
  const fields = [
    {
      name: 'username',
      placeholder: 'Username',
      rules: [
        {
          required: true,
          message: 'Please input your username!',
        },
      ],
      icon: <UserOutlined />,
    },
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
      to: '/',
      text: 'login ago!',
    },
  ];

  return <AuthForm fields={fields} returnLink={link} buttonText="Signup" />;
};

export default SignUp;
