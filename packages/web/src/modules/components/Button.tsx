import React from 'react';
import styled from 'styled-components';

export const ButtonUI = styled.button<IButtonProps>`
  display: inline-block;
  position: relative;
  font-size: 14px;
  line-height: 22px;
  color: ${({ color }) => color || '#FFF'};
  font-weight: 700;
  background-color: ${({ backgroundColor }) => backgroundColor || '#4B3BFF'};
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
  padding: 15px 37px;
  border-radius: 25px;
`;

interface IButtonProps {
  color?: string;
  backgroundColor?: string;
}

const Button: React.FC<IButtonProps> = ({ color, backgroundColor }) => {
  return <ButtonUI color={color} backgroundColor={backgroundColor} />;
};

export default Button;
