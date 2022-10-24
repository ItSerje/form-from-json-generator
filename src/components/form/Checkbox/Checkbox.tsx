import { FieldMetaProps, FormikValues, useField } from 'formik';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from '../form.module.scss';

// type CheckboxProps = JSX.IntrinsicElements['input'] & {
//   children: string | JSX.Element;
//   name: string;
// };

export type CheckboxProps = JSX.IntrinsicElements['input'] & {
  name: string;
  checkboxLabel: string;
  value?: string;
};

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const [field] = useField({ ...props, type: 'checkbox' });
  //   console.log(field);

  return (
    <label className={styles['checkbox-input']}>
      <input type='checkbox' {...field} />
      {props.checkboxLabel || props.value}
    </label>
  );
};
