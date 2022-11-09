import { ErrorMessage, Field, FieldArray, useField, getIn } from 'formik';
import React from 'react';
import styles from '../form.module.scss';
import { TextInput } from '../TextInput/TextInput';

export type MultipleInputsProps = JSX.IntrinsicElements['input'] & {
  name: string;
  placeholder?: string;
  addFieldBtnText?: string;
};

export const MultipleInputs = (props: MultipleInputsProps): JSX.Element => {
  const [field, meta, helpers] = useField(props);

  //   console.log('hey', field, meta, helpers);

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
                    className={
                      field.value.length > 1
                        ? ''
                        : styles['input-without-buttons']
                    }
                    name={`${field.name}.${index}`}
                    placeholder={props.placeholder}
                  />

                  {field.value.length > 1 && (
                    <div className={styles['input-btns-wrapper']}>
                      <div
                        className={styles['form-item-delete-btn']}
                        onClick={() => remove(index)}
                      >
                        X
                      </div>
                      {/* {index === field.value.length - 1 && (
                        <div
                        className={styles['form-item-delete-btn']}
                        onClick={() => push('')}
                        >
                        +
                        </div>
                    )} */}
                    </div>
                  )}
                </div>
                {touch && typeof meta.error === 'object' ? (
                  <div className={styles.error}>{meta.error[index]}</div>
                ) : null}
              </div>
            );
          })}

          <button type='button' onClick={() => push('')}>
            {props.addFieldBtnText || 'Add'}
          </button>
        </>
      )}
    </FieldArray>
  );
};
