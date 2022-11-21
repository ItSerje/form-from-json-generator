import { FC, useEffect, useState } from 'react';
import multiStepFormJson from '../../../jsonSamples/multi-step-form.json';
import singleStepFormJson from '../../../jsonSamples/single-step-form.json';
import invalidFormJson from '../../../jsonSamples/invalid-form.json';

type LoadPresetButtonsProps = {
  allBtnsUnpressed: boolean;
  onClick: (parsedJson: object) => void;
};

const LoadPresetButtons: FC<LoadPresetButtonsProps> = ({
  allBtnsUnpressed,
  onClick,
}) => {
  const [pressedBtn, setPressedBtn] = useState(1);

  useEffect(() => {
    if (allBtnsUnpressed) {
      setPressedBtn(0);
    }
  }, [allBtnsUnpressed]);

  return (
    <div className='neuromorphic'>
      <button
        className={`btn btn--rounded btn--embossed ${
          pressedBtn === 1 ? 'pressed' : null
        }`}
        type='button'
        onClick={() => {
          onClick(multiStepFormJson);
          setPressedBtn(1);
        }}
      >
        Multi-step Sample
      </button>
      <button
        className={`btn btn--rounded btn--embossed ${
          pressedBtn === 2 ? 'pressed' : null
        }`}
        type='button'
        onClick={() => {
          onClick(singleStepFormJson);
          setPressedBtn(2);
        }}
      >
        Single-step Sample
      </button>
      <button
        className={`btn btn--rounded btn--embossed ${
          pressedBtn === 3 ? 'pressed' : null
        }`}
        type='button'
        onClick={() => {
          onClick(invalidFormJson);
          setPressedBtn(3);
        }}
      >
        Invalid Sample
      </button>
    </div>
  );
};

export default LoadPresetButtons;
