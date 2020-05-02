import React from 'react';

import styled from 'styled-components';
import { darken } from 'polished';
import { Spin } from '../common';

export const ButtonUI = styled.button<IButtonProps>`
  color: ${({ color }) => color || '#FFF'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#4B3BFF'};
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  width: 250px;
  height: 40px;
  font-weight: 500;
  font-size: 16px;

  &:hover {
    background-color: ${props =>
      props?.backgroundColor ? darken(0.1, props?.backgroundColor || '') : darken(0.1, '#4B3BFF')};
  }
`;

interface IButtonProps {
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode | string;
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({ color, backgroundColor, loading, children }) => {
  return (
    <ButtonUI color={color} backgroundColor={backgroundColor}>
      {loading ? <Spin style={{ fontSize: 20, color: '#FFF' }} /> : children}
    </ButtonUI>
  );
};

export default Button;
