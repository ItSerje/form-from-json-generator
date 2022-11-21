import { FC } from 'react';

type ValidationErrorMessagesProps = {
  messages: string[];
};

const ValidationErrorMessages: FC<ValidationErrorMessagesProps> = ({
  messages,
}) => {
  return (
    <div className='container'>
      <h1>Json Data Validation Error</h1>
      <h4>
        The form cannot be displayed due to errors in json data. Please resolve
        the following errors:
      </h4>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
};

export default ValidationErrorMessages;
