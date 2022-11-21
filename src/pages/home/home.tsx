import { FC, useState } from 'react';
import FormFromJsonContainer from '../../views/form/FormFromJson';
import { FilePickerAsButton, LoadPresetButtons } from './components';
import '../../styles/main.scss';
import multiStepFormJson from '../../jsonSamples/multi-step-form.json';

const Home: FC = () => {
  const [parsedJson, setParsedJson] = useState<any>(multiStepFormJson);
  const [allBtnsUnpressed, setAllBtnsUnpressed] = useState(false);

  return (
    <>
      <div className='container introduction neuromorphic'>
        <h1>Form-From-Json Generator</h1>
        <FilePickerAsButton
          onFilePick={(parsedJson) => {
            setParsedJson(parsedJson);
            setAllBtnsUnpressed(true);
          }}
        />
        <LoadPresetButtons
          allBtnsUnpressed={allBtnsUnpressed}
          onClick={(parsedJson) => {
            setParsedJson(parsedJson);
            setAllBtnsUnpressed(false);
          }}
        />
      </div>
      {parsedJson && <FormFromJsonContainer parsedJson={parsedJson} />}
    </>
  );
};

export default Home;
