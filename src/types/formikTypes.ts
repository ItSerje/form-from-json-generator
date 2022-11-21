import { FormikValues, FormikErrors } from 'formik';

export type TValuesAndErrors = {
  values: FormikValues;
  errors: FormikErrors<FormikValues>;
};
