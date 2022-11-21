import { FormikErrors, FormikTouched } from 'formik';
import { FC } from 'react';

type HintOrErrorProps = {
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  hint?: string;
};

const HintOrError: FC<HintOrErrorProps> = (props) => {
  const { touched, error, hint } = props;
  return (
    <>
      {touched && error && typeof error === 'string' ? (
        <div className='form__message form__message--error'>{error}</div>
      ) : hint ? (
        <div className='form__message'>{hint}</div>
      ) : null}
    </>
  );
};

export default HintOrError;
