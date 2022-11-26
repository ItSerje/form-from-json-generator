import { FormikValues, FormikErrors } from 'formik';

export type TFormikValuesAndErrors = {
  values: FormikValues;
  errors: FormikErrors<FormikValues>;
};
