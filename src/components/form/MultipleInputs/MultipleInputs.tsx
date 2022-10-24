import { ErrorMessage, Field, FieldArray, useField, getIn } from 'formik';
import React from 'react';
import styles from '../form.module.scss';
import { TextInput } from '../TextInput/TextInput';

export type MultipleInputsProps = JSX.IntrinsicElements['input'] & {
  name: string;
  placeholder?: string;
};

export const MultipleInputs = (props: MultipleInputsProps): JSX.Element => {
  const [field, meta] = useField(props);
  //   console.log(props, field);

  return (
    <FieldArray name={field.name}>
      {({ push, remove, form }) => (
        <>
          {field.value.map((v: string, index: number) => {
            const touch = getIn(form.touched, `${field.name}.${index}`);

            return (
              <div key={index}>
                <div className={styles['input-wrapper']}>
                  <TextInput
                    name={`${field.name}.${index}`}
                    placeholder={props.placeholder}
                  />
                  <div
                    className={styles['input-btns-wrapper']}
                    onClick={() => remove(index)}
                  >
                    <div className={styles['form-item-delete-btn']}>X</div>
                  </div>
                </div>
                {touch && typeof meta.error === 'object' ? (
                  <div className={styles.error}>{meta.error[index]}</div>
                ) : null}
              </div>
            );
          })}

          <button type='button' onClick={() => push('')}>
            Add another number
          </button>
        </>
      )}
    </FieldArray>
  );
};
