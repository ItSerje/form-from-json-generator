import React, { FC, useEffect, useState } from 'react';
import { Formik, Form, useFormik } from 'formik';
import { TextInput, TextInputProps } from './TextInput/TextInput';
// import { TextInputWithAddMore } from './TextInput/TextInputWithAddMore';
import { NumberInput } from './NumberInput/NumberInput';
import { Checkbox, CheckboxProps } from './Checkbox/Checkbox';
import { CheckboxGroup, CheckboxGroupProps } from './Checkbox/CheckboxGroup';
import {
  MultipleInputs,
  MultipleInputsProps,
} from './MultipleInputs/MultipleInputs';
import { Select, SelectProps } from './Select/Select';
import * as Yup from 'yup';
import { MultipleFilesUploadField } from './UploadInput/MultipleFilesUploadField';
import { formJsonValidationSchema } from '../../validations/formValidations/formJsonValidationSchema';
import {
  dynamicFormValidationsGenerator,
  Data,
} from '../../validations/formValidations/dynamicFormValidationsGenerator';
import { Label } from './Label/Label';
import { HintOrError } from './HintOrError/HintOrError';
import formDataJson from '../../form-data.json';

const COMPONENTS = {
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  CheckboxGroup,
  MultipleInputs,
};

// export type Data = {
//   formLabel: string;
//   fields: {
//     component: string;
//     label?: string;
//     placeholder?: string;
//     name: string;
//     initialValue?: any;
//     requiredLabel?: boolean;
//     min?: number;
//     max?: number;
//     hint?: string;
//     options?: string[];
//     validationType?: string;
//     validations?: [];
//   }[];
// } | null;

// type InitialValues = {
//   [key: string]: any;
// };

// interface Props {
//   selectProps: SelectProps;
//   textInputProps: TextInputProps;
// }

const fetchDataUrl = 'https://api.npoint.io/dbad6207d801d27a240b';
const editDataUrl = 'https://www.npoint.io/docs/dbad6207d801d27a240b';

export const FormFromJson: FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [isDynamicallyLoaded, setIsDynamicallyLoaded] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ error: false, msg: '' });

  const handleRefetch = () => {
    setShouldRefresh((oldValue) => !oldValue);
  };

  const fetchJson = async () => {
    setIsLoading(true);
    setIsError({ error: false, msg: '' });

    const response = await fetch(fetchDataUrl);
    const fetchedData = await response.json();

    if (fetchedData) {
      formJsonValidationSchema
        .validate(fetchedData, {
          strict: true,
          abortEarly: false,
          stripUnknown: true,
        })
        .then((result) => {
          console.log('validated:', result);
          setData(result as Data);
          setInitialValues(getInitialValues(result as Data));
          setIsError({ error: false, msg: '' });
        })
        .catch((err) => {
          setIsError({
            error: true,
            msg: `${err.errors.join(' | ')}`,
          });
          console.log('validation fail', err.errors);
        });
      setIsDynamicallyLoaded(true);
    } else {
      setData(formDataJson as Data);
      setInitialValues(getInitialValues(formDataJson as Data));
      setIsDynamicallyLoaded(false);
    }
    setIsLoading(false);
  };

  const getInitialValues = (data: Data) => {
    const initialValues: {
      [key: string]: any;
    } = {};

    if (!data?.fields) {
      return initialValues;
    }

    data.fields.forEach((field: { name: string; initialValue?: any }) => {
      if (field.initialValue || typeof field.initialValue === 'boolean') {
        initialValues[field.name] = field.initialValue;
      } else {
        initialValues[field.name] = '';
      }
    });

    return initialValues;
  };

  useEffect(() => {
    fetchJson();
  }, [shouldRefresh]);

  //   const initialValues = getInitialValues();

  return (
    <>
      {!data?.fields?.length && <h1>No data to display!</h1>}
      {isDynamicallyLoaded ? (
        <h4>
          Data is loaded dynamically from server. To test the form, you can edit
          json{' '}
          <a href={editDataUrl} target='_blank'>
            here
          </a>{' '}
          and then{' '}
          <button type='button' onClick={handleRefetch}>
            Refresh
          </button>
        </h4>
      ) : (
        <h4>
          Server error. Could not load data dynamically. Data is served from
          static file.
        </h4>
      )}
      {isLoading && <h1>Loading...</h1>}
      {isError.error && (
        <>
          <h1>Form Json Data Validation Error</h1>
          <h4>
            The form cannot be displayed due to errors in json data. Please
            resolve the following errors:
          </h4>
          <p>{isError.msg}</p>
        </>
      )}
      {!isError.error && !isLoading && initialValues && (
        <>
          <h1>{data?.formLabel}</h1>
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
                    <React.Fragment key={index}>
                      {field.label && (
                        <Label
                          label={field.label}
                          fieldName={field.name}
                          requiredLabel={field.requiredLabel}
                        />
                      )}
                      {React.createElement(
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
                        touched={touched[field.name as keyof typeof touched]}
                        error={errors[field.name as keyof typeof errors]}
                        hint={field.hint}
                      />
                    </React.Fragment>
                  );
                })}

                <button
                  type='submit'
                  //   disabled={!dirty || !isValid || isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting' : 'Submit'}
                </button>
                <h1>Values and Errors</h1>
                <pre>{JSON.stringify({ values, errors }, null, 2)}</pre>
              </Form>
            )}
          </Formik>
          {/* <h1>Source JSON</h1> */}
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
      )}
    </>
  );
};
