import { FC } from 'react';
import { useField } from 'formik';
import styles from '../form.module.scss';

// export type TextInputProps = JSX.IntrinsicElements['input'] & {
//   label: string;
//   name: string;
//   placeholder?: string;
// };

type TextInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
};

const TextInput: FC<TextInputProps> = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        // className={meta.error && meta.touched ? styles['validation-error'] : ''}
        className='input'
        spellCheck='false'
        type={props.type || 'text'}
        {...field}
        {...props}
      />
    </>
  );
};

export default TextInput;
