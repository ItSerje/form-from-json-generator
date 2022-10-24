import { ErrorMessage, Field, FieldArray, useField } from 'formik';
import React from 'react';
import styles from '../form.module.scss';

type TextInputWithAddMoreProps = JSX.IntrinsicElements['input'] & {
  label?: string;
  name: string;
  placeholder?: string;
};

export const TextInputWithAddMore = ({
  label,
  placeholder,
  ...props
}: TextInputWithAddMoreProps): JSX.Element => {
  const [field, meta, helpers] = useField(props);

  return (
    <FieldArray name={field.name}>
      {({ push, remove }) => (
        <React.Fragment>
          {label && <label>{label}</label>}

          {field.value.map((v: string, index: number) => (
            <div key={index}>
              <div className={styles['input-wrapper']}>
                <Field
                  type={'text'}
                  // {...field}
                  placeholder={placeholder}
                  name={`phoneNumbers.${index}.phone`}
                  // value={field.value[index].phone}
                />
                {/* {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
              ) : null} */}
                {/* {meta.touched && typeof meta.error === 'object' ? (
                  <div className={styles.error}>{meta.error[index].phone}</div>
                ) : null} */}
                <div
                  className={styles['input-btns-wrapper']}
                  onClick={() => remove(index)}
                >
                  <div className={styles['form-item-delete-btn']}>X</div>
                </div>
              </div>
              <div className={styles.error}>
                <ErrorMessage name={`phoneNumbers.${index}.phone`} />{' '}
              </div>
            </div>
          ))}

          {typeof meta.error === 'string' ? (
            <div className={styles.error}>{meta.error}</div>
          ) : null}
          <button type='button' onClick={() => push({ phone: '' })}>
            Add another number
          </button>
        </React.Fragment>
      )}
    </FieldArray>
  );
};
