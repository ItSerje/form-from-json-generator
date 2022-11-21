import { FC, createElement, useState } from 'react';
import { Formik, Form } from 'formik';
import FormComponents from '../../../components/form';
import generateFormValidations from '../../../utils/formUtils/generateFormValidations';
import { TField, TFormData } from '../../../types/jsonTypes';
import FormObserver from './FormObserver';

// make list of components not to mix those used in json with the rest ones exported by default as FormComponents
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
  formData: TFormData;
  initialValues: any;
  handleFormValuesChange: ({ values, errors }: any) => void;
};

const FormFromJson: FC<FormFromJsonProps> = ({
  formData,
  initialValues,
  handleFormValuesChange,
}) => {
  const [step, setStep] = useState(0);

  const isLastStep = () => {
    return step === formData.steps?.length - 1;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() =>
        generateFormValidations(formData.steps[step].fields)
      }
      onSubmit={(values, { setSubmitting, setTouched }) => {
        if (isLastStep()) {
          setTimeout(() => {
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
      {({ touched, errors, isSubmitting }) => {
        return (
          <Form className='form' autoComplete='off'>
            <FormObserver handleFormValuesChange={handleFormValuesChange} />
            {formData.formLabel && (
              <h1 className='box-title'>{formData.formLabel}</h1>
            )}
            {formData.steps[step].stepLabel && (
              <h2 className='box-title'>{formData.steps[step].stepLabel}</h2>
            )}
            {formData.steps[step].fields?.map((field: TField, index) => {
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
            })}
            <FormComponents.ButtonGroup
              step={step}
              btnText={formData.btnText}
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
