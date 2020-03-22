import React from 'react';
import styled from 'styled-components/native';
import {TextInput} from 'react-native';
import {useFormikContext} from 'formik';

const Container = styled.View`
  flex-direction: column;
`;

const Label = styled.Text`
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#222',
})`
  height: 45px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 10px;
`;

const Error = styled.Text`
  color: #ff3d57;
  font-size: 12px;
`;

interface IFormProps extends TextInput {
  label: string;
  name: string;
}

const Form: React.FC<IFormProps> = ({name, label, ...props}) => {
  const {values, handleChange, handleBlur, errors} = useFormikContext<any>();

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
        {...props}
      />
      <Error>{errors[name]}</Error>
    </Container>
  );
};

export default Form;
