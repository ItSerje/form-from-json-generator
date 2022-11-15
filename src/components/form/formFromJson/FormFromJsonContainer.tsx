import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import localFormDataJson from '../../../form-data.json';
import { formJsonValidationSchema } from '../../../validations/formValidations/formJsonValidationSchema';
import { FormFromJson } from './FormFromJson';
import { Data } from '../../../validations/formValidations/dynamicFormValidationsGenerator';
import { getInitialValues } from '../../../utils/formUtils/getInitialValues';
import { CurrentFormValuesAndErrors } from '../CurrentFormValuesAndErrors/CurrentFormValuesAndErrors';

const editDataUrl = 'https://www.npoint.io/docs/dbad6207d801d27a240b';

type FormFromJsonContainerProps = {
  fetchDataUrl: string;
  //   setCurrentValuesAndErrors: Dispatch<
  //     SetStateAction<{ values: {}; errors: {} }>
  //   >;
};

export const FormFromJsonContainer: FC<FormFromJsonContainerProps> = ({
  fetchDataUrl,
  //   setCurrentValuesAndErrors,
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [isDynamicallyLoaded, setIsDynamicallyLoaded] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ error: false, msg: '' });

  const [currentValuesAndErrors, setCurrentValuesAndErrors] = useState({
    values: {},
    errors: {},
  });

  const handleFormValuesChange = ({ values, errors }: any) => {
    setCurrentValuesAndErrors({ values, errors });
    // console.log(values, errors);
  };

  const handleRefetch = () => {
    setShouldRefresh((oldValue) => !oldValue);
  };

  const fetchJson = async () => {
    setIsLoading(true);
    setIsError({ error: false, msg: '' });

    try {
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
      }
    } catch (error) {
      console.log(error);
      //   setData(localFormDataJson as Data);
      //   setInitialValues(getInitialValues(localFormDataJson as Data));
      //   setIsDynamicallyLoaded(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJson();
  }, [shouldRefresh, fetchDataUrl]);

  return (
    <>
      <div className='container neuromorphic'>
        {!data && !isLoading && !isError && <h1>No data to display!</h1>}
        {isLoading && <h1>Loading...</h1>}
        {!isLoading &&
          (isDynamicallyLoaded ? (
            <h4>
              Data is loaded dynamically from server. To test the form, you can{' '}
              <a href={editDataUrl} target='_blank'>
                <button
                  type='button'
                  className='btn btn--embossed btn--squared btn--inline'
                >
                  Edit Json
                </button>
              </a>{' '}
              <br />
              If you mess things up, you can always{' '}
              <button
                type='button'
                className='btn btn--embossed btn--squared btn--inline'
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(localFormDataJson, null, 2)
                  );
                }}
              >
                Copy Default Data
              </button>
              <br />
              Don't forget to{' '}
              <button
                type='button'
                className='btn btn--embossed btn--squared btn--inline'
                onClick={handleRefetch}
              >
                Refresh
              </button>{' '}
              the form after making changes
            </h4>
          ) : (
            <h4>
              Server error. Could not load data dynamically. Json is served from
              static file. Try refreshing the page or provide alternative json
              source. If you wish to use your own json source or just want to
              see default json structure, you can{' '}
              <button
                type='button'
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(localFormDataJson, null, 2)
                  );
                }}
              >
                Copy Default Data
              </button>{' '}
              to clipboard
            </h4>
          ))}

        {isError.error && (
          <>
            <h1>Json Data Validation Error</h1>
            <h4>
              The form cannot be displayed due to errors in json data. Please
              resolve the following errors:
            </h4>
            <p>{isError.msg}</p>
          </>
        )}
      </div>
      {!isError.error && !isLoading && data && data.formLabel && initialValues && (
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
