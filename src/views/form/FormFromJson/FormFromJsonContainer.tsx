import { FC, useEffect, useState } from 'react';
import { validateParsedJson } from '../../../validations/formValidations/validateParsedJson';
import FormFromJson from './FormFromJson';
import { TFormData } from '../../../types/jsonTypes';
import { TFormikValuesAndErrors } from '../../../types/formikTypes';
import { getInitialValues } from '../../../utils/formUtils/getInitialValues';
import CurrentFormValuesAndErrors from '../CurrentFormValuesAndErrors';
import ValidationErrorMessages from '../JsonValidationErrorMessages';
import Modal from '../Modal';

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
  const [formikValuesAndErrors, setFormikValuesAndErrors] =
    useState<TFormikValuesAndErrors>({ values: {}, errors: {} });
  const [modalShown, setModalShown] = useState(false);
  const [key, setKey] = useState(0);

  const refreshForm = () => {
    setKey((key) => key + 1);
  };

  const getFormikValuesAndErrors = ({
    values,
    errors,
  }: TFormikValuesAndErrors) => {
    setFormikValuesAndErrors({ values, errors });
  };

  const toggleModal = () => {
    setModalShown((current) => !current);
  };

  useEffect(() => {
    setFormData(null);
    setInitialValues({});
    setJsonValidationError({ error: false, messages: [] });
    validateParsedJson(
      parsedJson,
      (validatedJson: TFormData) => {
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
      {jsonValidationError.error && (
        <ValidationErrorMessages messages={jsonValidationError.messages} />
      )}
      {!jsonValidationError.error && formData && initialValues && (
        <div className='container-column neuromorphic'>
          <div className='box'>
            <FormFromJson
              formData={formData}
              initialValues={initialValues}
              getFormikValuesAndErrors={getFormikValuesAndErrors}
              toggleModal={toggleModal}
              key={key}
            />
          </div>
          <div className='box'>
            <CurrentFormValuesAndErrors
              values={formikValuesAndErrors.values}
              errors={formikValuesAndErrors.errors}
            />
          </div>
        </div>
      )}
      {modalShown && (
        <Modal
          closeModal={toggleModal}
          values={formikValuesAndErrors.values}
          resetForm={refreshForm}
        />
      )}
    </>
  );
};

export default FormFromJsonContainer;
