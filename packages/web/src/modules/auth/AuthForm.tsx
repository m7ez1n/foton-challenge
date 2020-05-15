import React from 'react';
import { FormikProvider, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import { Form, Input } from 'formik-antd';

import { Button } from '../common';

import styled from 'styled-components';

import logo from '../../assets/logo@2x.png';

const Container = styled.section`
  background: linear-gradient(180deg, #4b3bba, #000);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Box = styled.section`
  width: 500px;
  height: 500px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 20px;
`;

const FormContainer = styled.article`
  align-self: stretch;
  margin-top: 50px;
  display: flex;
  justify-content: center;

  form {
    width: 50%;

    button {
      margin-bottom: 10px;
    }
  }
`;

interface IFormProps {
  loading?: boolean;
  fields: {
    name: string;
    placeholder?: string;
    icon?: React.ReactNode;
    typePassword?: boolean;
  }[];
  returnLink: {
    to: string;
    text: string;
  }[];
  buttonText: string;
  formik: FormikProps<any>;
}

const AuthForm: React.FC<IFormProps> = ({ loading, fields, returnLink, buttonText, formik }) => {
  return (
    <Container>
      <Box>
        <Image src={logo} />
        <FormContainer>
          <FormikProvider value={formik}>
            <Form name="auth_login" initialValues={{ remember: true }}>
              {fields?.map(field => (
                <Form.Item key={`input_${field.name}`} name={field.name}>
                  {field.typePassword ? (
                    <Input.Password
                      size="large"
                      name={field.name}
                      prefix={field.icon}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <Input size="large" name={field.name} prefix={field.icon} placeholder={field.placeholder} />
                  )}
                </Form.Item>
              ))}

              <Form.Item name="formButtons" style={{ paddingBottom: 10 }}>
                <Button loading={loading}>{buttonText}</Button>
                Or{' '}
                {returnLink?.map(link => (
                  <Link key={`link_for_${link.to}`} to={link.to}>
                    {link.text}
                  </Link>
                ))}
              </Form.Item>
            </Form>
          </FormikProvider>
        </FormContainer>
      </Box>
    </Container>
  );
};

export default AuthForm;
