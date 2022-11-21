import { FC, useEffect, useState } from 'react';
import { validateParsedJson } from '../../../validations/formValidations/validateJson';
import FormFromJson from './FormFromJson';
import { TData } from '../../../types/jsonTypes';
import { TValuesAndErrors } from '../../../types/formikTypes';
import { getInitialValues } from '../../../utils/formUtils/getInitialValues';
import CurrentFormValuesAndErrors from '../CurrentFormValuesAndErrors';
import ValidationErrorMessages from '../ValidationErrorMessages';

type FormFromJsonContainerProps = {
  parsedJson: any; // data will be validated by yup
};

const FormFromJsonContainer: FC<FormFromJsonContainerProps> = ({
  parsedJson,
}) => {
  const [data, setData] = useState<TData | null>(null);
  const [initialValues, setInitialValues] = useState({});
  const [jsonValidationError, setJsonValidationError] = useState({
    error: false,
    messages: [],
  });
  const [currentValuesAndErrors, setCurrentValuesAndErrors] =
    useState<TValuesAndErrors>({
      values: {},
      errors: {},
    });

  const handleFormValuesChange = ({ values, errors }: TValuesAndErrors) => {
    setCurrentValuesAndErrors({ values, errors });
  };

  useEffect(() => {
    validateParsedJson(
      parsedJson,
      (validatedJson) => {
        setJsonValidationError({ error: false, messages: [] });
        setData(validatedJson as TData);
        setInitialValues(getInitialValues(validatedJson as TData));
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
      {!data && !jsonValidationError.error && (
        <div className='container'>
          <h1>No data to display!</h1>
        </div>
      )}
      {jsonValidationError.error && (
        <ValidationErrorMessages messages={jsonValidationError.messages} />
      )}

      {!jsonValidationError.error && data && initialValues && (
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

export default FormFromJsonContainer;
