import { FC, createElement } from 'react';
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
  getFormikValuesAndErrors: ({ values, errors }: any) => void;
  toggleModal: () => void;
};

const FormFromJson: FC<FormFromJsonProps> = ({
  formData,
  initialValues,
  getFormikValuesAndErrors,
  toggleModal,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={false ? () => generateFormValidations(formData) : null}
      onSubmit={(_, { setSubmitting }) => {
        setTimeout(() => {
          return new Promise((res) => {
            setTimeout(res, 2500);
            setSubmitting(false);
            toggleModal();
          });
        }, 400);
      }}
    >
      {({ touched, errors, isSubmitting }) => {
        return (
          <Form className='form' autoComplete='off'>
            <FormObserver getFormikValuesAndErrors={getFormikValuesAndErrors} />
            {formData.formLabel && (
              <h1 className='box-title'>{formData.formLabel}</h1>
            )}
            {formData.fields?.map((field: TField, index) => {
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
            <div className='form__field-wrapper btn-group'>
              <FormComponents.Button
                type='submit'
                disabled={isSubmitting}
                value={isSubmitting ? 'Submiting...' : 'Submit'}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormFromJson;
