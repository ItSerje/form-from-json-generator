import { FC } from 'react';
import { useField } from 'formik';

type TextInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
};

const TextInput: FC<TextInputProps> = (props) => {
  const [field] = useField(props);

  return (
    <input
      className='input'
      spellCheck='false'
      type={props.type || 'text'}
      {...field}
      {...props}
    />
  );
};

export default TextInput;
