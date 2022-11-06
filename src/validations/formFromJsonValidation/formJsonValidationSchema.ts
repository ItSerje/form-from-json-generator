import * as yup from 'yup';

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
      if (!list) {
        return true;
      }
      return list.length === new Set(list.map(mapper)).size;
    });
  }
);

const optionsSchema = yup
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
    is: (val: string) => val === 'CheckboxGroup' || val === 'Select',
    otherwise: yup
      .array()
      .max(
        0,
        '${path} with the current "component" value should not contain "options". "Options" are only allowed for "CheckboxGroup" and "Select" components'
      ),
  });

const validationsSchema = yup.array(
  yup
    .object()
    .shape({
      type: yup
        .string()
        .oneOf(['min', 'max', 'required', 'oneOf', 'innerType', 'email']),
      params: yup.mixed().when('type', {
        is: 'innerType',
        then: yup.object().shape({
          validationType: yup
            .string()
            .oneOf(['string', 'number', 'array', 'boolean']),
          validations: yup.array(
            yup
              .object()
              .shape({
                type: yup
                  .string()
                  .oneOf([
                    'min',
                    'max',
                    'required',
                    'oneOf',
                    'innerType',
                    'email',
                  ]),
                params: yup.array(yup.mixed()),
              })
              .noUnknown()
          ),
        }),
        otherwise: yup.array(yup.mixed()),
      }),
    })
    .noUnknown()
);

const fieldsSchema = yup.array(
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
      requiredLabel: yup.boolean(),
      hint: yup.string(),
      checkboxLabel: yup.string().when('component', {
        is: 'Checkbox',
        then: yup.string().required(),
        otherwise: yup
          .string()
          .oneOf([undefined], '${path} should be used only with Checkbox'),
      }),
      selectAll: yup.boolean(),
      options: optionsSchema,
      validationType: yup
        .string()
        .oneOf(['string', 'number', 'array', 'boolean']),
      validations: validationsSchema,
    })
    .noUnknown()
);

export const formJsonValidationSchema = yup
  .object({
    formLabel: yup.string(),
    fields: fieldsSchema
      .required()
      .unique((s) => s.name, '${path}: Value of property "name" is duplicated'),
  })
  .noUnknown();
