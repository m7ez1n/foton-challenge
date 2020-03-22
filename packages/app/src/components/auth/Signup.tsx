import React, {FC} from 'react';
import {useMutation, graphql} from 'relay-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {showMessage} from 'react-native-flash-message';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import AuthenticationForm from './AuthenticationForm';

const Signup: FC = () => {
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
      childrens={fields}
      submitText="Sign up"
      comeback={{label: 'Back to login', to: 'SignIn'}}
    />
  );
};

export default Signup;
