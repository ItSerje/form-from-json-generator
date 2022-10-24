import { useField } from 'formik';
import styles from '../form.module.scss';

// export type SelectProps = JSX.IntrinsicElements['select'] & {
//   label: string;
//   name: string;
//   placeholder?: string;
//   options?: {
//     value: string;
//     label: string;
//   }[];
// };

export type SelectProps = {
  name: string;
  required?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
};

export const Select = (props: SelectProps): JSX.Element => {
  const [field] = useField(props);
  const { options, required, ...rest } = props;

  if (!options) {
    return <></>;
  }

  return (
    <select {...field} {...rest}>
      {options.map((option, index) => {
        return (
          <option
            value={option.value}
            key={index}
            disabled={!option.value && required}
            hidden={!option.value && required}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
