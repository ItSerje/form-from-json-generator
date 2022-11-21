import { FC } from 'react';
import { useField } from 'formik';
import { FaMinus, FaPlus } from 'react-icons/fa';

type NumberInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
};

const NumberInput: FC<NumberInputProps> = (props) => {
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
    <div className='input-with-embedded-btn'>
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
      <div className='input-with-embedded-btn__btn-container'>
        <button className='btn' type='button' onClick={decreaseHandler}>
          <span>
            <FaMinus />
          </span>
        </button>
        <button className='btn' type='button' onClick={increaseHandler}>
          <span>
            <FaPlus />
          </span>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
