import React, {FC} from 'react';
import {useMutation, graphql} from 'relay-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {showMessage} from 'react-native-flash-message';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import AuthenticationForm from './AuthenticationForm';

const Signup: FC = () => {
  const navigation = useNavigation();

  const [mutate, {loading}] = useMutation(
    graphql`
      mutation SignupMutation($input: UserRegisterMutation) {
        UserRegisterMutation(input: $input) {
          token
          error
        }
      }
    `,
    {
      onCompleted: async ({UserRegisterMutation}: any) => {
        if (UserRegisterMutation!.error && !UserRegisterMutation.token) {
          showMessage({
            message: 'Registration failed',
            description: UserRegisterMutation!.error,
            type: 'danger',
            icon: 'info',
          });
        } else {
          await AsyncStorage.setItem('token', UserRegisterMutation!.token);
          navigation.reset({
            routes: [{name: 'Auth'}],
          });
        }
      },
      onError: () => {
        showMessage({
          message: 'Registration failed',
          description: 'Network request failed',
          type: 'danger',
          icon: 'danger',
        });
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('E-mail needs to be valid e-mail')
        .required('E-mail is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be more than 6')
        .max(16, 'Password cant be more 16'),
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
      name: 'name',
      label: 'Name',
      config: {
        autoCorrect: false,
        autoCapitalize: 'none',
        placeholder: 'Full name',
        returnKeyType: 'next',
      },
    },
    {
      name: 'email',
      label: 'E-mail',
      config: {
        keyboardType: 'email-address',
        autoCorrect: false,
        autoCapitalize: 'none',
        placeholder: 'Your e-mail',
        returnKeyType: 'next',
      },
    },
    {
      name: 'password',
      label: 'Password',
      config: {
        secureTextEntry: true,
        placeholder: 'Your password',
        returnKeyType: 'send',
      },
    },
  ];

  return (
    <AuthenticationForm
      loading={loading}
      formik={formik}
      childrens={fields}
      submitText="Sign up"
      comeback={{label: 'Back to login', to: 'SignIn'}}
    />
  );
};

export default Signup;
