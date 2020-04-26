import React from 'react';

import { Input, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button } from '../common';

import styled from 'styled-components';

import logo from '../../assets/logo@2x.png';

const Container = styled.section`
  background: linear-gradient(5deg, #4b3bff, #000);
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

const AuthForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Container>
      <Box>
        <Image src={logo} />
        <FormContainer>
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ paddingBottom: 10 }}>
              <Button>Login</Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </FormContainer>
      </Box>
    </Container>
  );
};

export default AuthForm;

// TODO componentizar o auth pra todas as páginas de auth
// seguindo o auth do Jean (https://github.com/jean-leonco/Foton-mono/blob/master/packages/app/src/modules/auth/AuthForm.tsx)
