import { FC, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { TFormikValuesAndErrors } from '../../../types/formikTypes';

type FormObserverProps = {
  getFormikValuesAndErrors: ({
    values,
    errors,
  }: TFormikValuesAndErrors) => void;
};

const FormObserver: FC<FormObserverProps> = ({ getFormikValuesAndErrors }) => {
  const { values, errors }: TFormikValuesAndErrors = useFormikContext();

  useEffect(() => {
    getFormikValuesAndErrors({ values, errors });
  }, [values, errors]);

  return null;
};

export default FormObserver;
