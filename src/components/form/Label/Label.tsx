import { FC } from 'react';

type LabelProps = {
  label: string;
  fieldName: string;
  requiredLabel?: boolean;
};

export const Label: FC<LabelProps> = ({ label, fieldName, requiredLabel }) => {
  return (
    <label htmlFor={fieldName} className='form__field-label'>
      {label}{' '}
      {requiredLabel ? (
        <span className='form__field-label-required-mark'>*</span>
      ) : null}
    </label>
  );
};
