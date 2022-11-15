import { useField } from 'formik';
import styles from '../form.module.scss';
import { IconContext } from 'react-icons';
import { FaMinus, FaPlus } from 'react-icons/fa';

export type NumberInputProps = JSX.IntrinsicElements['input'] & {
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
      //   className={`${styles['input-wrapper']} ${
      //     meta.error && meta.touched ? styles['validation-error'] : ''
      //   }`}
      className='input-with-embedded-btn'
    >
      <input
        className='input'
        style={{ paddingRight: '8.8rem' }}
        type='text'
        {...field}
        {...props}
        onChange={(e) => {
          if (/^\d+$/.test(e.target.value) || e.target.value === '') {
            field.onChange(e);
          }
        }}
      />
      {/* <div className={styles['input-btns-wrapper']}>
        <span onClick={increaseHandler}></span>
        <span onClick={decreaseHandler}></span>
        </div> */}
      <div className='input-with-embedded-btn__btn-container'>
        <button className='btn' type='button' onClick={decreaseHandler}>
          {/* <i className='fa-solid fa-minus'></i> */}
          <span>
            <FaMinus />
          </span>
        </button>
        <button className='btn' type='button' onClick={increaseHandler}>
          {/* <i className='fa-solid fa-minus'></i> */}
          <span>
            <FaPlus />
          </span>
        </button>
      </div>
    </div>
  );
};
