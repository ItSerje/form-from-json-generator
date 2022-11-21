import React, { FC } from 'react';
import { FieldArray, useField, getIn } from 'formik';
import { FaTrash, FaPlusCircle } from 'react-icons/fa';
import TextInput from '../TextInput';
import HintOrError from '../HintOrError';

type MultipleInputsProps = JSX.IntrinsicElements['input'] & {
  name: string;
  placeholder?: string;
  addFieldBtnText?: string;
};

const MultipleInputs: FC<MultipleInputsProps> = (props) => {
  const { name, placeholder, addFieldBtnText } = props;
  const [field, meta] = useField(name);

  return (
    <FieldArray name={field.name}>
      {({ push, remove, form }) => (
        <>
          {field.value.map((_: string, index: number) => {
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
                      placeholder={placeholder}
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
                      </div>
                    )}
                  </div>
                  {isLastElement() && (
                    <button
                      className='btn btn--squared btn--embossed'
                      type='button'
                      onClick={() => push('')}
                    >
                      <span>{addFieldBtnText || <FaPlusCircle />}</span>
                    </button>
                  )}
                </div>
                {touch && typeof meta.error === 'object' ? (
                  <HintOrError touched={touch} error={meta.error[index]} />
                ) : null}
              </React.Fragment>
            );
          })}
        </>
      )}
    </FieldArray>
  );
};

export default MultipleInputs;
