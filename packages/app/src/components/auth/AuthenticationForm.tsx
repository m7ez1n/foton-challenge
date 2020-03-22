import React, {FC} from 'react';
import {FormikProvider, FormikProps} from 'formik';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import logo from '../../assets/logo.png';

import {Button, Input} from '../common';

const Image = styled.Image`
  width: 100px;
  height: 100px;
`;

const ContainerForm = styled.SafeAreaView`
  background-color: #000;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Form = styled.KeyboardAvoidingView`
  align-self: stretch;
  margin-top: 50px;
`;

const ComebackText = styled.Text`
  color: #fff;
  font-size: 16px;
  align-items: center;
`;

interface IAuthenticationForm {
  loading?: boolean;
  childrens: {
    name: string;
    label: string;
    config: any;
  }[];
  formik: FormikProps<any>;
  submitText: string;
  comeback: {
    label: string;
    to: string;
  };
}

const AuthenticationForm: FC<IAuthenticationForm> = ({
  loading,
  childrens,
  formik,
  submitText,
  comeback,
}) => {
  const navigation = useNavigation();

  const {handleSubmit} = formik;

  return (
    <ContainerForm>
      <Image source={logo} />

      <FormikProvider value={formik}>
        <Form>
          {childrens.map(field => (
            <React.Fragment key={field.name}>
              <Input name={field.name} label={field.label} {...field.config} />
            </React.Fragment>
          ))}

          <Button loading={loading} onPress={() => handleSubmit()}>
            {submitText}
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate(comeback.to)}>
            <ComebackText>{comeback.label}</ComebackText>
          </TouchableOpacity>
        </Form>
      </FormikProvider>
    </ContainerForm>
  );
};

export default AuthenticationForm;
