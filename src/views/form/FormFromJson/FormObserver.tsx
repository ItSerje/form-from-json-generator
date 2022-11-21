import { FC, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { TValuesAndErrors } from '../../../types/formikTypes';

type FormObserverProps = {
  handleFormValuesChange: ({ values, errors }: TValuesAndErrors) => void;
};

const FormObserver: FC<FormObserverProps> = ({ handleFormValuesChange }) => {
  const { values, errors }: TValuesAndErrors = useFormikContext();

  useEffect(() => {
    handleFormValuesChange({ values, errors });
  }, [values, errors]);

  return null;
};

export default FormObserver;
