import { FC, useState } from 'react';
import FormFromJsonContainer from '../../views/form/FormFromJson';
import { FilePickerAsButton, LoadPresetButtons } from './components';
import '../../styles/main.scss';
import formSample from '../../form-sample.json';

const Home: FC = () => {
  const [parsedJson, setParsedJson] = useState<any>(formSample);

  return (
    <>
      <div className='container introduction neuromorphic'>
        <h1>Form-From-Json Generator</h1>
        <FilePickerAsButton
          onFilePick={(parsedJson) => {
            setParsedJson((p: object) => Object.assign({}, p, parsedJson));
          }}
        />
        <LoadPresetButtons formSample={formSample} />
      </div>
      {parsedJson && (
        <FormFromJsonContainer parsedJson={parsedJson} key={parsedJson.id} />
      )}
    </>
  );
};

export default Home;
