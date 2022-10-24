import { useField } from 'formik';
import styles from '../form.module.scss';

type NumberInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
};

export const NumberInput = (props: NumberInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(props);

  const increaseHandler = () => {
    if (!meta.touched) {
      helpers.setTouched(true);
    }
    helpers.setValue(Number(field.value) + 1, true);
  };
  const decreaseHandler = () => {
    if (!meta.touched) {
      helpers.setTouched(true);
    }
    if (Number(field.value) - 1 >= 0) {
      helpers.setValue(Number(field.value) - 1, true);
    }
  };

  return (
    <div
      className={`${styles['input-wrapper']} ${
        meta.error && meta.touched ? styles['validation-error'] : ''
      }`}
    >
      <input
        type='text'
        {...field}
        {...props}
        onChange={(e) => {
          if (/^\d+$/.test(e.target.value) || e.target.value === '') {
            field.onChange(e);
          }
        }}
      />
      <div className={styles['input-btns-wrapper']}>
        <span onClick={increaseHandler}></span>
        <span onClick={decreaseHandler}></span>
      </div>
    </div>
  );
};
