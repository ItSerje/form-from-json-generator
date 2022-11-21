import { FC, useEffect, useState } from 'react';
import { validateParsedJson } from '../../../validations/formValidations/validateParsedJson';
import FormFromJson from './FormFromJson';
import { TFormData } from '../../../types/jsonTypes';
import { TValuesAndErrors } from '../../../types/formikTypes';
import { getInitialValues } from '../../../utils/formUtils/getInitialValues';
import CurrentFormValuesAndErrors from '../CurrentFormValuesAndErrors';
import ValidationErrorMessages from '../JsonValidationErrorMessages';

type FormFromJsonContainerProps = {
  parsedJson: any; // data will be validated by yup
};

const FormFromJsonContainer: FC<FormFromJsonContainerProps> = ({
  parsedJson,
}) => {
  const [formData, setFormData] = useState<TFormData | null>(null);
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

  const getFormValuesAndErrors = ({ values, errors }: TValuesAndErrors) => {
    setCurrentValuesAndErrors({ values, errors });
  };

  useEffect(() => {
    validateParsedJson(
      parsedJson,
      (validatedJson: TFormData) => {
        setJsonValidationError({ error: false, messages: [] });
        setFormData(validatedJson);
        setInitialValues(getInitialValues(validatedJson));
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
      {!formData && !jsonValidationError.error && (
        <div className='container'>
          <h1>No data to display!</h1>
        </div>
      )}
      {jsonValidationError.error && (
        <ValidationErrorMessages messages={jsonValidationError.messages} />
      )}
      {!jsonValidationError.error && formData && initialValues && (
        <div className='container-column neuromorphic'>
          <div className='box'>
            <FormFromJson
              formData={formData}
              initialValues={initialValues}
              getFormValuesAndErrors={getFormValuesAndErrors}
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
