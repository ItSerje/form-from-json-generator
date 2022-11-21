import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useFormikContext } from 'formik';

type FormObserverProps = {
  handleFormValuesChange: ({ values, errors }: any) => void;
};

const FormObserver: FC<FormObserverProps> = ({ handleFormValuesChange }) => {
  const { values, errors } = useFormikContext();
  useEffect(() => {
    handleFormValuesChange({ values, errors });
  }, [values, errors]);

  return null;
};

export default FormObserver;
