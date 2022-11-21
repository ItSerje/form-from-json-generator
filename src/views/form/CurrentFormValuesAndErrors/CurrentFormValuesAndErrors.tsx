import { FC } from 'react';
import { cutStringFromStart } from '../../../utils/generalUtils/cutStringFromStart';

type CurrentFormValuesAndErrorsProps = {
  values: object;
  errors: object;
};

const CurrentFormValuesAndErrors: FC<CurrentFormValuesAndErrorsProps> = ({
  values,
  errors,
}) => {
  const maxLength = 100;

  return (
    <div className='current'>
      <h1>Current Values and Erors</h1>
      <pre>
        values:{' '}
        {JSON.stringify(
          cutStringFromStart(JSON.parse(JSON.stringify(values)), maxLength),
          null,
          2
        )}
      </pre>
      <pre>
        errors:{' '}
        {JSON.stringify(
          cutStringFromStart(JSON.parse(JSON.stringify(errors)), maxLength),
          null,
          2
        )}
      </pre>
      <p>{`* Note: Values longer than ${maxLength} symbols are cut`}</p>
    </div>
  );
};

export default CurrentFormValuesAndErrors;
