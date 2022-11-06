import { FC } from 'react';

type LabelProps = {
  label: string;
  fieldName: string;
  requiredLabel?: boolean;
};

export const Label: FC<LabelProps> = ({ label, fieldName, requiredLabel }) => {
  return (
    <label htmlFor={fieldName}>
      {label} {requiredLabel ? <span style={{ color: 'red' }}>*</span> : null}
    </label>
  );
};
