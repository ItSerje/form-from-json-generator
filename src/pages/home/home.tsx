import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { FC, useState } from 'react';
import { string } from 'yup';
import { CurrentFormValuesAndErrors } from '../../components/form/CurrentFormValuesAndErrors/CurrentFormValuesAndErrors';
import { FormFromJsonContainer } from '../../components/form/formFromJson/FormFromJsonContainer';
import '../../styles/main.scss';
import jsonMultistepForm from '../../multistep-form.json';

const Home: FC = () => {
  const [parsedJson, setParsedJson] = useState(jsonMultistepForm);

  return (
    <>
      <div className='container introduction'>
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
          cause both app crashing and form failure, served json is validated
          using predefined Yup schema. Errors in json structure, if any, are
          displayed, so that you know what is wrong. Form validation rules, if
          they are present in json, are also generated dynamically using Yup.
        </p>

        {/* <FormGroup>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label='Render from JSON'
          />
        </FormGroup> */}
        {/* <div className='neuromorphic'>
          <label className='form__field-label'>Json Source</label>
          <input
            className='input'
            type='text'
            value={fetchDataUrl}
            onChange={(e) => setFetchDataUrl(e.target.value)}
            spellCheck='false'
          />
        </div> */}
      </div>

      <FormFromJsonContainer
        parsedJson={parsedJson}
        //   setCurrentValuesAndErrors={setCurrentValuesAndErrors}
      />

      {/* <div className='box'>
        <CurrentFormValuesAndErrors
          values={currentValuesAndErrors.values}
          errors={currentValuesAndErrors.errors}
        />
      </div> */}
    </>
  );
};

export default Home;
