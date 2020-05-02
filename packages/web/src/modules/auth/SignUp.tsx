import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation, graphql } from 'relay-hooks';
import history from '../../routes/history';

import AuthForm from './AuthForm';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';

const SignUp: React.FC = () => {
  // const [mutation, { loading }] = useMutation<SignUpMutation>(
  //   graphql`
  //     mutation RegisterUserEmail($input: UserRegisterMutationInput!) {
  //       UserRegisterMutation(input: $input) {
  //         token
  //         error
  //       }
  //     }
  //   `,
  //   {
  //     onCompleted: async ({ UserRegisterMutation }: SignUpMutationResponse) => {
  //       if (UserRegisterMutation!.error && !UserRegisterMutation!.token) {
  //         toast.error(`❌ Registration failed, ${UserRegisterMutation!.error}`);
  //       } else {
  //         localStorage.setItem('token', UserRegisterMutation!.token!);
  //         history.push('/todo');
  //       }
  //     },
  //     onError: () => {
  //       toast.error('❌ Registration failed, network request failed');
  //     },
  //   },
  // );

  const fields = [
    {
      name: 'username',
      placeholder: 'Username',
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
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('E-mail needs to be a valid e-mail')
        .required('E-mail is required'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be more than 4')
        .max(16, "Password can't be more than 16"),
    }),
    onSubmit: input => {
      console.log(input);
    },
  });

  return <AuthForm formik={formik} fields={fields} returnLink={link} buttonText="Signup" />;
};

export default SignUp;
