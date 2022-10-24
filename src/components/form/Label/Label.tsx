import { FC } from 'react';

type LabelProps = {
  label: string;
  fieldName: string;
  required?: boolean;
};

export const Label: FC<LabelProps> = ({ label, fieldName, required }) => {
  return (
    <label htmlFor={fieldName}>
      {label} {required ? <span style={{ color: 'red' }}>*</span> : null}
    </label>
  );
};
