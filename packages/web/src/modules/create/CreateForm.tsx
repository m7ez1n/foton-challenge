import React from 'react';
import { FormikProvider, FormikProps } from 'formik';
import { Button } from 'antd';
import { Form, Input } from 'formik-antd';

import styled from 'styled-components';

export const StyledFooter = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;

  button:first-child {
    margin-right: 8px;
  }
`;

interface Props {
  loading?: boolean;
  fields: {
    name: string;
    label?: string;
    placeholder?: string;
    isTextArea?: boolean;
    icon?: React.ReactNode;
  }[];
  formik: FormikProps<any>;
  handleClose: () => void;
}

const CreateForm: React.FC<Props> = ({ loading, fields, formik, handleClose }) => {
  return (
    <FormikProvider value={formik}>
      <Form name="create_task">
        {fields.map(field => (
          <Form.Item key={`key_form_item_${field.name}`} name={field.name} label={field.label}>
            {field.isTextArea ? (
              <Input.TextArea name={field.name} placeholder={field.placeholder} rows={5} />
            ) : (
              <Input size="middle" name={field.name} placeholder={field.placeholder} prefix={field.icon} />
            )}
          </Form.Item>
        ))}
        <StyledFooter>
          <Button onClick={handleClose}>Cancel</Button>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </StyledFooter>
      </Form>
    </FormikProvider>
  );
};

export default CreateForm;
