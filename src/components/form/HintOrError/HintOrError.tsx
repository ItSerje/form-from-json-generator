import { FormikErrors, FormikTouched } from 'formik';
import { FC } from 'react';
import styles from '../form.module.scss';

type HintOrErrorProps = {
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  hint?: string;
};

export const HintOrError: FC<HintOrErrorProps> = ({ touched, error, hint }) => {
  return (
    <>
      {touched && error && typeof error === 'string' ? (
        <div className={styles.error}>{error}</div>
      ) : hint ? (
        <div className={styles.hint}>{hint}</div>
      ) : null}
    </>
  );
};
