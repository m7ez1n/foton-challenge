import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

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
}

const Button: React.FC<IButtonProps> = ({ color, backgroundColor, children }) => {
  return (
    <ButtonUI color={color} backgroundColor={backgroundColor}>
      {children}
    </ButtonUI>
  );
};

export default Button;
