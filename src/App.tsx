import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { SignupForm } from './components/form/Form';
import { FormFromJson } from './components/form/FormFromJson';

const App: FC = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label='Render from JSON'
        />
      </FormGroup>
      {!checked && <SignupForm />}
      {checked && <FormFromJson />}
    </>
  );
};

export default App;
