import React, {FC} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const ContainerButton = styled(TouchableOpacity)`
  background-color: rgb(75, 59, 255);
  width: 90%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const TextButton = styled.Text`
  color: #fff;
  font-size: 16px;
`;

interface IButtonProps {
  loading?: boolean;
  onPress(): void;
  style?: any;
}

const Button: FC<IButtonProps> = ({style = [], children, loading, onPress}) => {
  return (
    <ContainerButton onPress={onPress} style={[...style]}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <TextButton>{children}</TextButton>
      )}
    </ContainerButton>
  );
};

export default Button;
