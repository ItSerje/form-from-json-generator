import { FC } from 'react';

type LoadPresetButtonsProps = {
  formSample: object;
};

const LoadPresetButtons: FC<LoadPresetButtonsProps> = ({ formSample }) => {
  const downloadObjectAsJson = (jsonData: object, fileName: string) => {
    const file = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const jsonURL = window.URL.createObjectURL(file);
    const alink = document.createElement('a');
    alink.href = jsonURL;
    alink.download = fileName;
    alink.click();
    alink.remove();
  };

  return (
    <div className='neuromorphic'>
      <button
        className={`btn btn--rounded btn--embossed`}
        type='button'
        onClick={() => {
          downloadObjectAsJson(formSample, 'json');
        }}
      >
        Download Sample
      </button>
    </div>
  );
};

export default LoadPresetButtons;
