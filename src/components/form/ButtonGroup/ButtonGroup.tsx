import { FC } from 'react';
import Button from '../Button';

type ButtonGroupProps = {
  step: number;
  submitBtnText?: string;
  submittingBtnText?: string;
  nextBtnText?: string;
  backBtnText?: string;
  isSubmitting: boolean;
  isLastStep: boolean;
  onClick: () => void;
};

const ButtonGroup: FC<ButtonGroupProps> = ({
  step,
  submitBtnText = 'Submit',
  submittingBtnText = 'Submitting...',
  nextBtnText = 'Next',
  backBtnText = 'Back',
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
          value={backBtnText}
        />
      ) : null}
      <Button
        type='submit'
        disabled={isSubmitting}
        value={
          isSubmitting
            ? submittingBtnText
            : isLastStep
            ? submitBtnText
            : nextBtnText
        }
      />
    </div>
  );
};

export default ButtonGroup;
