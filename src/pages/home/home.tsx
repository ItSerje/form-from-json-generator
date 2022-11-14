import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { FC, useState } from 'react';
import { SignupForm } from '../../components/form/Form';
import { FormFromJsonContainer } from '../../components/form/formFromJson/FormFromJsonContainerWithSteps';

const Home: FC = () => {
  const [checked, setChecked] = useState(true);
  const [fetchDataUrl, setFetchDataUrl] = useState(
    'https://api.npoint.io/66d4fe66bc68be3a4642' ||
      'https://api.npoint.io/dbad6207d801d27a240b'
  );

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <h1>Form-From-Json Generator</h1>
      <p>
        This app built using React, Typescript,{' '}
        <a href='https://www.npmjs.com/package/formik' target='_blank'>
          Formik
        </a>{' '}
        and{' '}
        <a href='https://www.npmjs.com/package/yup' target='_blank'>
          Yup
        </a>{' '}
        demonstrates generation of forms from json. To handle errors which may
        cause both app crashing and form failure, served json is validated using
        predefined Yup schema. Errors in json structure, if any, are displayed,
        so that you know what is wrong. Form validation rules, if they are
        present in json, are also generated dynamically using Yup.
      </p>

      <FormGroup>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label='Render from JSON'
        />
      </FormGroup>
      <label>Json Source</label>
      <input
        type='text'
        value={fetchDataUrl}
        onChange={(e) => setFetchDataUrl(e.target.value)}
        spellCheck='false'
      />
      {!checked && <SignupForm />}
      {checked && <FormFromJsonContainer fetchDataUrl={fetchDataUrl} />}
    </>
  );
};

export default Home;
