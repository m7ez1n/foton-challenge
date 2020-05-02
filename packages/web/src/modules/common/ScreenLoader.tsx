import React from 'react';

import styled from 'styled-components';

import { Spin } from './index';

const Container = styled.section`
  background: linear-gradient(180deg, #4b3bba, #000);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const ScreenLoading: React.FC = () => {
  return (
    <Container>
      <Spin style={{ fontSize: 500, color: '#FFF' }} />
    </Container>
  );
};

export default ScreenLoading;
