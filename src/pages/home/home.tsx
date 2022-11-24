import { FC, useState } from 'react';
import FormFromJsonContainer from '../../views/form/FormFromJson';
import { FilePickerAsButton, LoadPresetButtons } from './components';
import '../../styles/main.scss';
import multiStepFormJson from '../../jsonSamples/multi-step-form.json';
import { injectRandomId } from '../../utils/generalUtils/injectRandomId';

const initialJson = injectRandomId(multiStepFormJson);

const Home: FC = () => {
  const [parsedJson, setParsedJson] = useState<any>(initialJson);
  const [allBtnsUnpressed, setAllBtnsUnpressed] = useState(false);

  function filePickHandler(parsedJson: any) {
    injectRandomId(parsedJson);
    // console.log('got it');
    // console.log(parsedJson);

    setParsedJson((p: object) => {
      p = parsedJson;
    });
  }

  return (
    <>
      <div className='container introduction neuromorphic'>
        <h1>Form-From-Json Generator</h1>
        <FilePickerAsButton
          onFilePick={(parsedJson) => {
            filePickHandler(parsedJson);
            setAllBtnsUnpressed(true);
          }}
        />
        <LoadPresetButtons
          allBtnsUnpressed={allBtnsUnpressed}
          onClick={(parsedJson) => {
            filePickHandler(parsedJson);
            setAllBtnsUnpressed(false);
          }}
        />
      </div>
      {parsedJson && (
        <FormFromJsonContainer parsedJson={parsedJson} key={parsedJson.id} />
      )}
    </>
  );
};

export default Home;
