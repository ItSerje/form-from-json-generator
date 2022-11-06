import { useField } from 'formik';
import styles from '../form.module.scss';

// export type TextInputProps = JSX.IntrinsicElements['input'] & {
//   label: string;
//   name: string;
//   placeholder?: string;
// };

export type TextInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
};

export const TextInput = (props: TextInputProps): JSX.Element => {
  const [field, meta] = useField(props);
  console.log('field', field);

  return (
    <>
      <input
        className={meta.error && meta.touched ? styles['validation-error'] : ''}
        type={props.type || 'text'}
        {...field}
        {...props}
      />
    </>
  );
};
