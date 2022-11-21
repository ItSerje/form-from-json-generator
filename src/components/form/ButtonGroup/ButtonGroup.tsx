import { FC } from 'react';
import Button from '../Button';

type ButtonGroupProps = {
  step: number;
  btnText?: {
    submit?: string;
    submitting?: string;
    next?: string;
    back?: string;
  };

  isSubmitting: boolean;
  isLastStep: boolean;
  onClick: () => void;
};

const ButtonGroup: FC<ButtonGroupProps> = ({
  step,
  btnText,
  isSubmitting,
  isLastStep,
  onClick,
}) => {
  return (
    <div className='form__field-wrapper btn-group'>
      {step > 0 ? (
        <Button
          type='button'
          disabled={isSubmitting}
          onClick={onClick}
          value={btnText?.back || 'Back'}
        />
      ) : null}
      <Button
        type='submit'
        disabled={isSubmitting}
        value={
          isSubmitting
            ? btnText?.submitting || 'Submitting'
            : isLastStep
            ? btnText?.submit || 'Submit'
            : btnText?.next || 'Next'
        }
      />
    </div>
  );
};

export default ButtonGroup;
