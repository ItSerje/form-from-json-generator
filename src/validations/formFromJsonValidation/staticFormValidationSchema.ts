import * as yup from 'yup';

export const staticFormValidationSchema = (): yup.AnyObjectSchema => {
  return yup.object({
    firstName: yup
      .string()
      .typeError('hi')
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: yup
      .string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    age: yup
      .number()
      .required('Required')
      .min(0, 'Invalid age')
      .max(120, 'Wow, you are older than 120, but please still use 120.')
      .integer('Only integers are allowed.'),
    email: yup.string().email('Invalid email address').required('Required'),
    acceptedTerms: yup
      .boolean()
      .required('Required')
      .oneOf([true], 'You must accept terms and conditions'),
    jobType: yup
      .string()
      .oneOf(
        ['designer', 'development', 'product', 'other'],
        'Invalid Job Type'
      )
      .required('Required'),
    favourites: yup.array().of(yup.string()),
    phoneNumbers: yup
      .array(
        yup
          .string()
          .required('Required')
          .matches(/^[0-9]*$/, 'Only numbers are allowed')
      )
      .required('Required')
      .min(2, 'You need to provide at least 2 phone numbers')
      .max(4, 'You can only provide 3 phone numbers'),
    files: yup.array(
      yup.object({
        url: yup.string().required(),
      })
    ),
  });
};
