import { FC } from 'react';
import { cutObjStringValuesFromStart } from '../../../utils/generalUtils/cutObjStringValuesFromStart';

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
          cutObjStringValuesFromStart(
            JSON.parse(JSON.stringify(values)),
            maxLength
          ),
          null,
          2
        )}
      </pre>
      <pre>
        errors:{' '}
        {JSON.stringify(
          cutObjStringValuesFromStart(
            JSON.parse(JSON.stringify(errors)),
            maxLength
          ),
          null,
          2
        )}
      </pre>
      <p>{`* Note: Values longer than ${maxLength} characters are cut`}</p>
    </div>
  );
};

export default CurrentFormValuesAndErrors;
