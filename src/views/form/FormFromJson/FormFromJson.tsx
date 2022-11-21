import { FC, createElement, useState } from 'react';
import { Formik, Form } from 'formik';
import FormComponents from '../../../components/form';
import {
  dynamicFormValidationsGenerator,
  Data,
} from '../../../validations/formValidations/dynamicFormValidationsGenerator';
import { fieldSchema } from '../../../validations/formValidations/formJsonValidationSchema';
import FormObserver from './FormObserver';
import * as yup from 'yup';

// not to mix FormComponents used in json with the rest ones exported by default
const COMPONENTS: { [key: string]: any } = {
  TextInput: FormComponents.TextInput,
  NumberInput: FormComponents.NumberInput,
  Select: FormComponents.Select,
  MultipleInputs: FormComponents.MultipleInputs,
  CheckboxGroup: FormComponents.CheckboxGroup,
  UploadInput: FormComponents.UploadInput,
  Checkbox: FormComponents.Checkbox,
};

type FormFromJsonProps = {
  data: Data;
  initialValues: any;
  handleFormValuesChange: ({ values, errors }: any) => void;
};

const FormFromJson: FC<FormFromJsonProps> = ({
  data,
  initialValues,
  handleFormValuesChange,
}) => {
  const [step, setStep] = useState(0);

  const isLastStep = () => {
    return step === data.steps?.length - 1;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() =>
        dynamicFormValidationsGenerator(data.steps[step].fields)
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
            {data.formLabel && <h1 className='box-title'>{data.formLabel}</h1>}
            {data.steps[step].stepLabel && (
              <h2 className='box-title'>{data.steps[step].stepLabel}</h2>
            )}
            {data.steps[step].fields?.map(
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
                      <FormComponents.Label
                        label={field.label}
                        fieldName={field.name}
                        requiredLabel={field.requiredLabel}
                      />
                    )}

                    {createElement(COMPONENTS[component], {
                      ...componentSpecific,
                      ...rest,
                    })}
                    <FormComponents.HintOrError
                      touched={touched[field.name]}
                      error={errors[field.name]}
                      hint={field.hint}
                    />
                  </div>
                );
              }
            )}
            <FormComponents.ButtonGroup
              step={step}
              submitBtnText={data.btnText.submit}
              submittingBtnText={data.btnText.submitting}
              nextBtnText={data.btnText.next}
              backBtnText={data.btnText.back}
              isSubmitting={isSubmitting}
              isLastStep={isLastStep()}
              onClick={() => {
                setStep((s) => s - 1);
              }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormFromJson;
