import { FC } from 'react';

type JsonValidationErrorMessagesProps = {
  messages: string[];
};

const JsonValidationErrorMessages: FC<JsonValidationErrorMessagesProps> = ({
  messages,
}) => {
  return (
    <div className='container'>
      <h1>Json Data Validation Error</h1>
      <h4>
        The form cannot be displayed due to errors in json data. Please resolve
        the following errors:
      </h4>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default JsonValidationErrorMessages;
