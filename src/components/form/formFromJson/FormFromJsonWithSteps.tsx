import { FC, Fragment, createElement, useState } from 'react';
import { Formik, Form } from 'formik';
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
} from '../../../validations/formValidations/dynamicFormValidationsGeneratorForSteps';
import { Label } from '../Label/Label';
import { HintOrError } from '../HintOrError/HintOrError';
import { CurrentFormValuesAndErrors } from '../CurrentFormValuesAndErrors/CurrentFormValuesAndErrors';
import { fieldSchema } from '../../../validations/formValidations/formJsonValidationSchemaForSteps';
import * as yup from 'yup';

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
};

export const FormFromJson: FC<FormFromJsonProps> = ({
  data,
  initialValues,
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
            alert(JSON.stringify(values, null, 2));
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
      {({ values, touched, errors, isSubmitting, dirty, isValid }) => (
        <Form>
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
                <Fragment key={index}>
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
                </Fragment>
              );
            }
          )}
          <div>
            {step > 0 ? (
              <button
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

          <CurrentFormValuesAndErrors values={values} errors={errors} />
        </Form>
      )}
    </Formik>
  );
};
