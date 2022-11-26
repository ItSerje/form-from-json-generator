import { FC, useState } from 'react';
import FormFromJsonContainer from '../../views/form/FormFromJson';
import { FilePickerAsButton, LoadPresetButtons } from './components';
import '../../styles/main.scss';
import formSample from '../../form-sample.json';

const Home: FC = () => {
  const [parsedJson, setParsedJson] = useState<any>(formSample);

  return (
    <>
      <div className='container introduction'>
        <h1>Form-From-Json Generator</h1>
        <div className='introduction__btn-container '>
          <FilePickerAsButton
            onFilePick={(parsedJson) => {
              setParsedJson(parsedJson);
            }}
          />
          <LoadPresetButtons formSample={formSample} />
        </div>
      </div>
      {parsedJson && (
        <FormFromJsonContainer parsedJson={parsedJson} key={parsedJson.id} />
      )}
    </>
  );
};

export default Home;
