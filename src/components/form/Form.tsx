import { FC } from 'react';
import { Formik, Form } from 'formik';
import { TextInput } from './TextInput/TextInput';
// import { TextInputWithAddMore } from './TextInput/TextInputWithAddMore';
import { MultipleInputs } from './MultipleInputs/MultipleInputs';
import { NumberInput } from './NumberInput/NumberInput';
import { Checkbox } from './Checkbox/Checkbox';
import { CheckboxGroup } from './Checkbox/CheckboxGroup';
import { Select } from './Select/Select';
import * as Yup from 'yup';
import { MultipleFilesUploadField } from './UploadInput/MultipleFilesUploadField';
import { staticFormValidationSchema } from '../../validations/formFromJsonValidation/staticFormValidationSchema';
import { Label } from './Label/Label';
import { HintOrError } from './HintOrError/HintOrError';

export const SignupForm: FC = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          age: '',
          email: '',
          acceptedTerms: false,
          jobType: '',
          favourites: [],
          phoneNumbers: [''],
          files: [],
        }}
        validationSchema={staticFormValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            return new Promise((res) => {
              setTimeout(res, 2500);
              setSubmitting(false);
            });
          }, 400);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <Label label='First Name' fieldName='firstName' />
            <TextInput name='firstName' type='text' placeholder='John' />
            <HintOrError
              touched={touched['firstName']}
              error={errors['firstName']}
            />

            <Label label='Last Name' fieldName='lastName' />
            <TextInput name='lastName' type='text' placeholder='Doe' />
            <HintOrError
              touched={touched['lastName']}
              error={errors['lastName']}
            />

            <Label label='Age' fieldName='age' />
            <NumberInput name='age' min='0' max='120' />
            <HintOrError touched={touched['age']} error={errors['age']} />

            <Label label='Email Address' fieldName='email' />
            <TextInput name='email' type='email' placeholder='john@doe.com' />
            <HintOrError touched={touched['email']} error={errors['email']} />

            <Label label='Your hobbies' fieldName='favourites' />
            <CheckboxGroup
              name='favourites'
              options={[
                { value: 'carving', checkboxLabel: 'Carving' },
                { value: 'philately', checkboxLabel: 'Philately' },
              ]}
            />
            <HintOrError
              touched={touched['favourites']}
              error={errors['favourites']}
            />

            <Label label='Email Address' fieldName='jobType' />
            <Select
              name='jobType'
              options={[
                { value: '', label: 'Select a job type' },
                { value: 'designer', label: 'Designer' },
                { value: 'development', label: 'Development' },
                { value: 'product', label: 'Product' },
                { value: 'other', label: 'Other' },
              ]}
            />
            <HintOrError
              touched={touched['jobType']}
              error={errors['jobType']}
            />

            <Label label='Phone Numbers' fieldName='phoneNumbers' />
            <MultipleInputs name='phoneNumbers' placeholder='Contact Number' />
            <HintOrError
              touched={touched['phoneNumbers']}
              error={errors['phoneNumbers']}
            />

            <MultipleFilesUploadField name='files' label='Upload Files' />

            <Checkbox
              name='acceptedTerms'
              checkboxLabel='I accept the terms and conditions'
            ></Checkbox>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting' : 'Submit'}
            </button>
            <pre>{JSON.stringify({ values, errors }, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
};
