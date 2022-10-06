import { FC } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import styles from './form.module.scss';

type InputProps = JSX.IntrinsicElements['input'] & {
  label: string;
  name: string;
};

type CheckboxProps = JSX.IntrinsicElements['input'] & {
  children: string | JSX.Element;
  name: string;
};

type CheckboxGroupProps = {
  children: string[] | JSX.Element[];
  groupLabel: string;
};

type SelectProps = JSX.IntrinsicElements['select'] & {
  label: string;
  name: string;
};

const TextInput = ({ label, ...props }: InputProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={styles['text-input']} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

const NumberInput = ({ label, ...props }: InputProps): JSX.Element => {
  const [field, meta, helpers] = useField({ ...props, type: 'text' });

  const increaseHandler = () => {
    helpers.setValue(Number(field.value) + 1, true);
  };
  const decreaseHandler = () => {
    if (Number(field.value) - 1 >= 0) {
      helpers.setValue(Number(field.value) - 1, true);
    }
  };

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <span onClick={decreaseHandler}>-</span>
      <input
        type='text'
        className={styles['number-input']}
        {...field}
        onChange={(e) => {
          if (/^\d+$/.test(e.target.value) || e.target.value === '') {
            field.onChange(e);
          }
        }}
        {...props}
      />
      <span onClick={increaseHandler}>+</span>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

const Checkbox = ({ children, ...props }: CheckboxProps): JSX.Element => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  console.log(field);
  return (
    <div>
      <label className={styles['checkbox-input']}>
        <input type='checkbox' {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const CheckboxGroup = ({
  groupLabel,
  children,
}: CheckboxGroupProps): JSX.Element => {
  return (
    <>
      <label htmlFor='checkbox-group'>{groupLabel}</label>
      <div id='checkbox-group' role='group' aria-labelledby='checkbox-group'>
        {children}
      </div>
    </>
  );
};

const Select = ({ label, ...props }: SelectProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

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
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          age: Yup.number()
            .required('Required')
            .min(0, 'Invalid age')
            .max(120, 'Wow, you are older than 120, but please still use 120.')
            .integer('Only integers are allowed.'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept terms and conditions'),
          jobType: Yup.string()
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            .required('Required'),
          favourites: Yup.array().of(Yup.string()),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <TextInput
            label='First Name'
            name='firstName'
            type='text'
            placeholder='John'
          />
          <TextInput
            label='Last Name'
            name='lastName'
            type='text'
            placeholder='Doe'
          />

          <NumberInput label='Age' name='age' min='0' max='120' />

          <TextInput
            label='Email Address'
            name='email'
            type='email'
            placeholder='john@doe.com'
          />

          <CheckboxGroup groupLabel='Checkbox Group'>
            <Checkbox name='favourites' value='Movies'>
              Movies
            </Checkbox>
            <Checkbox name='favourites' value='Hobbies'>
              Hobbies
            </Checkbox>
          </CheckboxGroup>

          <Select label='Job Type' name='jobType'>
            <option value=''>Select a job type</option>
            <option value='designer'>Designer</option>
            <option value='development'>Development</option>
            <option value='product'>Product</option>
            <option value='other'>Other</option>
          </Select>

          <Checkbox name='acceptedTerms'>
            I accept the terms and conditions
          </Checkbox>

          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </>
  );
};
