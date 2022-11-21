import { FC, useState } from 'react';
import FormFromJsonContainer from '../../views/form/FormFromJson';
import '../../styles/main.scss';
import jsonMultistepForm from '../../multistep-form.json';

const Home: FC = () => {
  const [parsedJson, setParsedJson] = useState(jsonMultistepForm);

  return (
    <>
      <div className='container introduction'>
        <h1>Form-From-Json Generator</h1>
      </div>
      <FormFromJsonContainer parsedJson={parsedJson} />
    </>
  );
};

export default Home;
