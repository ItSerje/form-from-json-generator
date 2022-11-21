import { FieldMetaProps, FormikValues, useField } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Checkbox from '../Checkbox';

type CheckboxGroupProps = {
  name: string;
  options?: { value: string; checkboxLabel: string }[];
  selectAll?: boolean;
};

const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const { name, options, selectAll } = props;
  const [field, meta, helpers] = useField({ name });
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const selectAllCheckbox = useRef<HTMLInputElement>(null);

  const allValues = options?.map((item) => item.value);

  const handleSelectAll = () => {
    if (!selectAllChecked) {
      helpers.setTouched(true);
      helpers.setValue(allValues, true);
      setSelectAllChecked(true);
    } else {
      helpers.setValue([], true);
      setSelectAllChecked(false);
    }
  };

  useEffect(() => {
    // console.log('type', typeof field.value, field.value);
    // console.log('all', allValues);

    if (
      typeof field.value !== 'string' &&
      field.value.sort().join('') === allValues?.sort().join('')
    ) {
      if (selectAllCheckbox.current) {
        selectAllCheckbox.current.checked = true;
      }
    } else {
      if (selectAllCheckbox.current) {
        selectAllCheckbox.current.checked = false;
      }
    }
  }, [field.value]);

  return (
    <div
      id={name}
      role='group'
      aria-labelledby={name}
      className='form__checkbox-group'
    >
      {options?.map((option, index) => (
        <Checkbox name={name} {...option} key={index} />
      ))}
      {selectAll && (
        <label className='single-checkbox__label'>
          <div className='single-checkbox__input-wrapper'>
            <input
              type='checkbox'
              className='single-checkbox__input'
              ref={selectAllCheckbox}
              onChange={handleSelectAll}
            />

            <span>
              <FaCheck />
            </span>
          </div>
          Выделить все
        </label>

        // <div className='single-checkbox__wrapper'>
        //   <input
        //     type='checkbox'
        //     ref={selectAllCheckbox}
        //     onChange={handleSelectAll}
        //     className='single-checkbox__input'
        //   />
        //   <label className='single-checkbox__label'>Выделить все</label>
        // </div>
      )}
    </div>
  );
};

export default CheckboxGroup;
