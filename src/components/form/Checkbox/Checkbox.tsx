import { useField } from 'formik';
import { FC } from 'react';
import { FaCheck } from 'react-icons/fa';

type CheckboxProps = JSX.IntrinsicElements['input'] & {
  name: string;
  checkboxLabel?: string;
  value?: string;
};

const Checkbox: FC<CheckboxProps> = (props) => {
  const [field] = useField({ ...props, type: 'checkbox' });

  return (
    <label className='single-checkbox__label'>
      <div className='single-checkbox__input-wrapper'>
        <input type='checkbox' className='single-checkbox__input' {...field} />
        <span>
          <FaCheck />
        </span>
      </div>
      {props.checkboxLabel ? props.checkboxLabel : props.value}
    </label>
    // </div>
  );
};

export default Checkbox;
