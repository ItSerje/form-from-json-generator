import { FC, useState } from 'react';
import FormFromJsonContainer from '../../views/form/FormFromJson';
import FilePickerAsButton from './components/FilePickerAsButton';
import '../../styles/main.scss';
import multistepFormJson from '../../multistep-form.json';

const Home: FC = () => {
  const [parsedJson, setParsedJson] = useState<any>(multistepFormJson);

  return (
    <>
      <div className='container introduction'>
        <h1>Form-From-Json Generator</h1>
        <FilePickerAsButton
          onFilePick={(parsedJson) => {
            setParsedJson(parsedJson);
          }}
        />
      </div>
      {parsedJson && <FormFromJsonContainer parsedJson={parsedJson} />}
    </>
  );
};

export default Home;
