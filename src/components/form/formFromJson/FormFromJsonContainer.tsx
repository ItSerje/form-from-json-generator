import { FC, useEffect, useState } from 'react';
import {
  formJsonValidationSchema,
  noNameDuplicatesSchema,
} from '../../../validations/formValidations/formJsonValidationSchema';
import { validateParsedJson } from '../../../validations/formValidations/validateJson';
import { FormFromJson } from './FormFromJson';
import { Data } from '../../../validations/formValidations/dynamicFormValidationsGenerator';
import { getInitialValues } from '../../../utils/formUtils/getInitialValues';
import { CurrentFormValuesAndErrors } from '../CurrentFormValuesAndErrors/CurrentFormValuesAndErrors';

type FormFromJsonContainerProps = {
  parsedJson: any; // data will be validated anyway
};

export const FormFromJsonContainer: FC<FormFromJsonContainerProps> = ({
  parsedJson,
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [initialValues, setInitialValues] = useState({});
  const [jsonValidationError, setJsonValidationError] = useState({
    error: false,
    messages: [],
  });

  const [currentValuesAndErrors, setCurrentValuesAndErrors] = useState({
    values: {},
    errors: {},
  });

  const handleFormValuesChange = ({ values, errors }: any) => {
    setCurrentValuesAndErrors({ values, errors });
    // console.log(values, errors);
  };

  useEffect(() => {
    validateParsedJson(
      parsedJson,
      (validatedJson) => {
        setJsonValidationError({ error: false, messages: [] });
        setData(validatedJson as Data);
        setInitialValues(getInitialValues(validatedJson as Data));
      },
      (error: { errors: [] }) => {
        setJsonValidationError({
          error: true,
          messages: error.errors,
        });
      }
    );
  }, [parsedJson]);

  return (
    <>
      {!data && !jsonValidationError && (
        <div className='container'>
          <h1>No data to display!</h1>
        </div>
      )}
      {jsonValidationError.error && (
        <div className='container'>
          <h1>Json Data Validation Error</h1>
          <h4>
            The form cannot be displayed due to errors in json data. Please
            resolve the following errors:
          </h4>
          {jsonValidationError.messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      )}

      {!jsonValidationError.error && data && data.formLabel && initialValues && (
        <div className='container-column neuromorphic'>
          <div className='box'>
            <FormFromJson
              data={data}
              initialValues={initialValues}
              handleFormValuesChange={handleFormValuesChange}
            />
          </div>
          <div className='box'>
            <CurrentFormValuesAndErrors
              values={currentValuesAndErrors.values}
              errors={currentValuesAndErrors.errors}
            />
          </div>
        </div>
      )}
    </>
  );
};
