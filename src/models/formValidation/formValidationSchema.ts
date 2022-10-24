import * as Yup from 'yup';
import * as yup from 'yup';
import formJson from '../../form-data.json';
import { Data } from '../../components/form/FormFromJson';
import { NONAME } from 'dns';

function createYupSchema(schema: any, config: any) {
  const { name, options = [], validationType, validations = [] } = config;

  if (!(Yup as any)[validationType]) {
    return schema;
  }

  let validator = (Yup as any)[validationType]();

  validations.forEach((validation: any) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    if (type === 'oneOf' && options.length > 0) {
      let valuesFromOptions = options.map(
        (option: { value: string }) => option.value
      );
      valuesFromOptions = valuesFromOptions.filter(
        (value: string) => value !== ''
      );
      validator = validator[type](valuesFromOptions, ...params);
      //   console.log('valsFromOptions', valuesFromOptions);
    } else {
      //   console.log(validator);
      validator = validator[type](...params);
    }
  });

  schema[name] = validator;
  //   console.log('schema', schema);
  return schema;
}
const yupSchema = (formData: Data) =>
  formData?.fields.reduce(createYupSchema, {});
export const validateSchema = (formData: Data) =>
  Yup.object().shape(yupSchema(formData));

export const formValidationSchema = () => {
  return Yup.object({
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
    email: Yup.string().email('Invalid email address').required('Required'),
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
    phoneNumbers: Yup.array(
      Yup.string()
        .required('Required')
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
    )
      .required('Required')
      .min(2, 'You need to provide at least 2 phone numbers')
      .max(4, 'You can only provide 3 phone numbers'),
    files: Yup.array(
      Yup.object({
        url: Yup.string().required(),
      })
    ),
  });
};

declare module 'yup' {
  interface ArraySchema<T> {
    unique(mapper: (a: any) => any, message?: any): ArraySchema<T>;
  }
}

yup.addMethod(
  yup.array,
  'unique',
  function (
    mapper = (s: any) => s,
    message: string = '${path} may not have duplicates'
  ) {
    return this.test('unique', message, (list) => {
      return list?.length === new Set(list?.map(mapper)).size;
    });
  }
);

// yup.addMethod(
//   yup.array,
//   'unique',
//   function (
//     message: string = '${path} may not have duplicates',
//     mapper = (s: any) => s
//   ) {
//     return this.test('unique', message, (list) => {
//       return list?.length === new Set(list?.map(mapper)).size;
//     });
//   }
// );

export const formFromJsonSchema = yup
  .object({
    formLabel: yup.string(),
    fields: yup
      .array(
        yup
          .object()
          .shape({
            component: yup
              .string()
              .required()
              .oneOf([
                'TextInput',
                'NumberInput',
                'Select',
                'Checkbox',
                'CheckboxGroup',
                'MultipleInputs',
              ]),
            name: yup.string().required(),
            label: yup.string(),
            placeholder: yup.string(),
            initialValue: yup.mixed(),
            required: yup.boolean(),
            hint: yup.string(),
            checkboxLabel: yup.string().when('component', {
              is: 'Checkbox',
              then: yup.string().required(),
              otherwise: yup
                .string()
                .oneOf(
                  [undefined],
                  '${path} should be used only with Checkbox'
                ),
            }),
            selectAll: yup.boolean(),
            options: yup
              .array()
              .when('component', {
                is: 'CheckboxGroup',
                then: yup
                  .array(
                    yup
                      .object()
                      .shape({
                        value: yup.string().required(),
                        checkboxLabel: yup.string().required(),
                      })
                      .noUnknown()
                  )
                  .required()
                  .unique(
                    (s) => s.value,
                    '${path}: Value of property "value" is duplicated'
                  )
                  .unique(
                    (s) => s.checkboxLabel,
                    '${path}: Value of property "label" is duplicated'
                  ),
              })
              .when('component', {
                is: 'Select',
                then: yup
                  .array(
                    yup
                      .object()
                      .shape({
                        value: yup.string().min(0),
                        label: yup.string().required(),
                      })
                      .noUnknown()
                  )
                  .unique(
                    (s) => s.value,
                    '${path}: Value of property "value" is duplicated'
                  )
                  .unique(
                    (s) => s.label,
                    '${path}: Value of property "label" is duplicated'
                  ),
              })
              .when('component', {
                is: (val: string) =>
                  val === 'CheckboxGroup' || val === 'Select',
                otherwise: yup
                  .array()
                  .max(
                    0,
                    '${path} with the current "component" value should not contain "options". "Options" are only allowed for "CheckboxGroup" and "Select" components'
                  ),
              }),
            validationType: yup.string(),
            validations: yup.array(
              yup
                .object()
                .shape({
                  type: yup.string(),
                  params: yup.array(yup.mixed()),
                  validationType: yup.string(),
                  validations: yup.array(
                    yup.object().shape({
                      type: yup.string(),
                      params: yup.array(yup.mixed()),
                    })
                  ),
                })
                .noUnknown()
            ),
          })
          .noUnknown()
      )
      .required()
      .unique((s) => s.name, '${path}: Value of property "name" is duplicated'),
  })
  .noUnknown();
