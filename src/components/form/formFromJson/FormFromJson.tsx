import {
  FC,
  Fragment,
  createElement,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import {
  Formik,
  Form,
  useFormikContext,
  FormikContextType,
  FormikValues,
} from 'formik';
import { TextInput, TextInputProps } from '../TextInput/TextInput';
import { NumberInput } from '../NumberInput/NumberInput';
import { Checkbox, CheckboxProps } from '../Checkbox/Checkbox';
import { CheckboxGroup, CheckboxGroupProps } from '../Checkbox/CheckboxGroup';
import {
  MultipleInputs,
  MultipleInputsProps,
} from '../MultipleInputs/MultipleInputs';
import { Select, SelectProps } from '../Select/Select';
import {
  MultipleFilesUploadField,
  MultipleFilesUploadFieldProps,
} from '../UploadInput/MultipleFilesUploadField';
import {
  dynamicFormValidationsGenerator,
  Data,
} from '../../../validations/formValidations/dynamicFormValidationsGenerator';
import { Label } from '../Label/Label';
import { HintOrError } from '../HintOrError/HintOrError';
import { CurrentFormValuesAndErrors } from '../CurrentFormValuesAndErrors/CurrentFormValuesAndErrors';
import { fieldSchema } from '../../../validations/formValidations/formJsonValidationSchema';
import * as yup from 'yup';
import { FormObserver } from '../FormObserver/FormObserver';

const COMPONENTS = {
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  CheckboxGroup,
  MultipleInputs,
  MultipleFilesUploadField,
};

type FormFromJsonProps = {
  data: Data;
  initialValues: any;
  handleFormValuesChange: ({ values, errors }: any) => void;
};

export const FormFromJson: FC<FormFromJsonProps> = ({
  data,
  initialValues,
  handleFormValuesChange,
}) => {
  const [step, setStep] = useState(0);

  const isLastStep = () => {
    return step === data.fields.length - 1;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() =>
        data ? dynamicFormValidationsGenerator(data.fields[step]) : null
      }
      onSubmit={(values, { setSubmitting, setTouched }) => {
        if (isLastStep()) {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            alert('Form is successfully submitted');
            return new Promise((res) => {
              setTimeout(res, 2500);
              setSubmitting(false);
            });
          }, 400);
        } else {
          setStep((s) => s + 1);
          setSubmitting(false);
          setTouched({});
        }
      }}
    >
      {({ values, touched, errors, isSubmitting, dirty, isValid }) => {
        return (
          <Form className='form' autoComplete='off'>
            <FormObserver handleFormValuesChange={handleFormValuesChange} />
            <h1 className='box-title'>{data.formLabel}</h1>
            {data?.fields[step]?.map(
              (field: yup.InferType<typeof fieldSchema>, index) => {
                const {
                  validationType,
                  validations,
                  component,
                  initialValue,
                  requiredLabel,
                  componentSpecific,
                  ...rest
                } = field;

                return (
                  <div className='form__field-wrapper' key={index}>
                    {field.label && (
                      <Label
                        label={field.label}
                        fieldName={field.name}
                        requiredLabel={field.requiredLabel}
                      />
                    )}
                    {createElement(
                      COMPONENTS[component as keyof typeof COMPONENTS],
                      {
                        ...componentSpecific,
                        ...rest,
                      }
                    )}
                    <HintOrError
                      touched={touched[field.name]}
                      error={errors[field.name]}
                      hint={field.hint}
                    />
                  </div>
                );
              }
            )}
            <div className='form__field-wrapper btn-group'>
              {step > 0 ? (
                <button
                  className='btn btn--rounded btn--floating'
                  type='button'
                  disabled={isSubmitting}
                  onClick={() => {
                    setStep((s) => s - 1);
                  }}
                >
                  Back
                </button>
              ) : null}
              <button
                className='btn btn--rounded btn--floating'
                type='submit'
                //   disabled={!dirty || !isValid || isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? data.submittingBtnText || 'Submitting...'
                  : isLastStep()
                  ? data.submitBtnText || 'Submit'
                  : 'Next'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
