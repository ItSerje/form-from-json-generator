import { FC, Fragment, createElement } from 'react';
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
  dynamicFormValidationsGenerator,
  Data,
} from '../../../validations/formValidations/dynamicFormValidationsGenerator';
import { Label } from '../Label/Label';
import { HintOrError } from '../HintOrError/HintOrError';
import { CurrentFormValuesAndErrors } from '../CurrentFormValuesAndErrors/CurrentFormValuesAndErrors';

const COMPONENTS = {
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  CheckboxGroup,
  MultipleInputs,
};

type FormFromJsonProps = {
  data: Data;
  initialValues: any;
};

export const FormFromJson: FC<FormFromJsonProps> = ({
  data,
  initialValues,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() =>
        data ? dynamicFormValidationsGenerator(data) : null
      }
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          return new Promise((res) => {
            setTimeout(res, 2500);
            setSubmitting(false);
          });
        }, 400);
      }}
    >
      {({ values, touched, errors, isSubmitting, dirty, isValid }) => (
        <Form>
          {data?.fields?.map((field, index) => {
            const {
              validationType,
              validations,
              component,
              initialValue,
              requiredLabel,
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
                    ...(rest as unknown as TextInputProps &
                      SelectProps &
                      MultipleInputsProps &
                      CheckboxProps &
                      CheckboxGroupProps),
                  }
                )}
                <HintOrError
                  touched={touched[field.name]}
                  error={errors[field.name]}
                  hint={field.hint}
                />
              </Fragment>
            );
          })}

          <button
            type='submit'
            //   disabled={!dirty || !isValid || isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting' : 'Submit'}
          </button>

          <CurrentFormValuesAndErrors values={values} errors={errors} />
        </Form>
      )}
    </Formik>
  );
};
