import { ErrorMessage, Field, FieldArray, useField, getIn } from 'formik';
import React from 'react';
import styles from '../form.module.scss';
import { TextInput } from '../TextInput/TextInput';
import { FaTrash, FaPlusCircle } from 'react-icons/fa';
import { HintOrError } from '../HintOrError/HintOrError';

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

            const isLastElement = () => {
              return index === field.value.length - 1;
            };

            return (
              <React.Fragment key={index}>
                <div className='input-group__row'>
                  <div className='input-with-embedded-btn'>
                    <TextInput
                      name={`${field.name}.${index}`}
                      placeholder={props.placeholder}
                    />

                    {field.value.length > 1 && (
                      <div className='input-with-embedded-btn__btn-container'>
                        <button
                          className='btn'
                          type='button'
                          onClick={() => remove(index)}
                        >
                          <span>
                            <FaTrash />
                          </span>
                        </button>
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
                  {isLastElement() && (
                    <button
                      className='btn btn--squared btn--embossed'
                      type='button'
                      onClick={() => push('')}
                    >
                      <span>
                        {props.addFieldBtnText || <FaPlusCircle />}
                        {/* <i class='fa-solid fa-plus-circle'></i> */}
                      </span>
                    </button>
                  )}
                </div>
                {touch && typeof meta.error === 'object' ? (
                  //   <div className={styles.error}>{meta.error[index]}</div>
                  <HintOrError touched={touch} error={meta.error[index]} />
                ) : null}
              </React.Fragment>
            );
          })}

          {/* <button type='button' onClick={() => push('')}>
            {props.addFieldBtnText || 'Add'}
          </button> */}
        </>
      )}
    </FieldArray>
  );
};
