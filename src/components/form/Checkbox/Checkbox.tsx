import { FieldMetaProps, FormikValues, useField } from 'formik';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
// import styles from '../form.module.scss';

// type CheckboxProps = JSX.IntrinsicElements['input'] & {
//   children: string | JSX.Element;
//   name: string;
// };

export type CheckboxProps = JSX.IntrinsicElements['input'] & {
  name: string;
  checkboxLabel?: string;
  value?: string;
};

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const [field] = useField({ ...props, type: 'checkbox' });

  return (
    // <div className='single-checkbox__wrapper'>
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
