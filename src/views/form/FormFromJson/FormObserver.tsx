import { FC, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { TValuesAndErrors } from '../../../types/formikTypes';

type FormObserverProps = {
  getFormValuesAndErrors: ({ values, errors }: TValuesAndErrors) => void;
};

const FormObserver: FC<FormObserverProps> = ({ getFormValuesAndErrors }) => {
  const { values, errors }: TValuesAndErrors = useFormikContext();

  useEffect(() => {
    getFormValuesAndErrors({ values, errors });
  }, [values, errors]);

  return null;
};

export default FormObserver;
