import { FC } from 'react';

type CurrentFormValuesAndErrorsProps = {
  values: object;
  errors: object;
};

export const CurrentFormValuesAndErrors: FC<
  CurrentFormValuesAndErrorsProps
> = ({ values, errors }) => {
  return (
    <>
      <h1>Current Values</h1>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <h1>Current Errors</h1>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </>
  );
};
