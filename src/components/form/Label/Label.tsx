import { FC } from 'react';

type LabelProps = {
  label: string;
  fieldName: string;
  requiredLabel?: boolean;
};

const Label: FC<LabelProps> = (props) => {
  const { label, fieldName, requiredLabel } = props;
  return (
    <label htmlFor={fieldName} className='form__field-label'>
      {label}{' '}
      {requiredLabel ? (
        <span className='form__field-label-required-mark'>*</span>
      ) : null}
    </label>
  );
};

export default Label;
