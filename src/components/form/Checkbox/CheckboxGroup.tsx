import { FieldMetaProps, FormikValues, useField } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Checkbox } from './Checkbox';
import styles from '../form.module.scss';

export type CheckboxGroupProps = {
  name: string;
  options?: { value: string; checkboxLabel: string }[];
  selectAll?: boolean;
};

export const CheckboxGroup = ({
  name,
  options,
  selectAll,
}: CheckboxGroupProps): JSX.Element => {
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
    <div id={name} role='group' aria-labelledby={name}>
      {options?.map((option, index) => (
        <Checkbox name={name} {...option} key={index} />
      ))}
      {selectAll && (
        <label className={styles['checkbox-input']}>
          <input
            type='checkbox'
            ref={selectAllCheckbox}
            onChange={handleSelectAll}
          />
          {'Выделить все'}
        </label>
      )}
    </div>
  );
};
