import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

import logo from '../../assets/logo@3x.png';

export const Container = styled.div`
  background: #fff;
  border-color: #dddddd;
  padding: 0 3rem;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    width: 700px;
    align-items: center;

    img {
      padding-right: 20px;
    }
  }
`;

export const Image = styled(Link)`
  img {
    width: 50px;
    height: 35px;
  }
`;

export const Profile = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;

  span:first-child {
    color: #444444;
    font-weight: 500;
    margin-bottom: 4px;
  }

  span:last-child {
    color: #de3b3b;
    cursor: pointer;
    font-size: 12px;
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <nav>
          <Image to="/todo">
            <img src={logo} alt="foton" />
          </Image>

          <Input.Search placeholder="input search text" size="large" onSearch={value => console.log(value)} />
        </nav>

        <Profile>
          <span>Mateus</span>
          <span>sair do sistema</span>
        </Profile>
      </Content>
    </Container>
  );
};

export default Header;
