import * as yup from 'yup';

declare module 'yup' {
  interface ArraySchema<T> {
    unique(mapper: (a: any) => any, message?: any): ArraySchema<T>;
  }
}

// the order of schemas below is reversed because schemas refer to one another

const fileTypeKeyValueSchema = {
  'image/*': yup.array(
    yup.string().oneOf(['.bmp', '.gif', '.jpeg', '.jpg', '.png', '.webp'])
  ),
  'video/*': yup.array(yup.string().oneOf(['.webm', '.avi', '.mp4', '.mpeg'])),
  'application/*': yup.array(yup.string().oneOf(['.pdf', '.rtf'])),
  'text/*': yup.array(
    yup.string().oneOf(['.txt', '.md', '.markdown', '.mdown', '.markdn'])
  ),
  'audio/*': yup.array(
    yup.string().oneOf(['.mid', '.midi', '.mp3', '.wav', '.weba'])
  ),

  'image/bmp': yup.array(yup.string().oneOf(['.bmp'])),
  'image/gif': yup.array(yup.string().oneOf(['.gif'])),
  'image/jpeg': yup.array(yup.string().oneOf(['.jpeg', '.jpg'])),
  'image/jpg': yup.array(yup.string().oneOf(['.jpeg', '.jpg'])),
  'image/png': yup.array(yup.string().oneOf(['.png'])),
  'image/webp': yup.array(yup.string().oneOf(['.webp'])),

  'application/rtf': yup.array(yup.string().oneOf(['.rtf'])),
  'application/pdf': yup.array(yup.string().oneOf(['.pdf'])),

  'video/webm': yup.array(yup.string().oneOf(['.webm'])),
  'video/x-msvideo': yup.array(yup.string().oneOf(['.avi'])),
  'video/mp4': yup.array(yup.string().oneOf(['.mp4'])),
  'video/mpeg': yup.array(yup.string().oneOf(['.mpeg'])),

  'text/plain': yup.array(yup.string().oneOf(['.txt'])),
  'text/markdown': yup.array(
    yup.string().oneOf(['.md', '.markdown', '.mdown', '.markdn'])
  ),
  'text/x-markdow': yup.array(
    yup.string().oneOf(['.md', '.markdown', '.mdown', '.markdn'])
  ),

  'audio/midi': yup.array(yup.string().oneOf(['.mid', '.midi'])),
  'audio/x-midi': yup.array(yup.string().oneOf(['.mid', '.midi'])),
  'audio/mpeg': yup.array(yup.string().oneOf(['.mp3'])),
  'audio/wav': yup.array(yup.string().oneOf(['.wav'])),
  'audio/webm': yup.array(yup.string().oneOf(['.weba'])),
};

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

const validationsFieldSchema = yup.array(
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

const SelectOptionsSchema = yup
  .array(
    yup
      .object()
      .shape({
        value: yup.string().min(0),
        label: yup.string().required(),
      })
      .noUnknown()
  )
  .unique((s) => s.value, '${path}: Value of property "value" is duplicated')
  .unique((s) => s.label, '${path}: Value of property "label" is duplicated');

const CheckboxGroupOptionsSchema = yup
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
  .unique((s) => s.value, '${path}: Value of property "value" is duplicated')
  .unique(
    (s) => s.checkboxLabel,
    '${path}: Value of property "label" is duplicated'
  );

const fieldSchema = yup
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
        'UploadInput',
      ]),
    name: yup.string().required(),
    label: yup.string(),
    placeholder: yup.string(),
    initialValue: yup.mixed(),
    requiredLabel: yup.boolean(),
    hint: yup.string(),
    componentSpecific: yup
      .object()
      .when('component', {
        is: 'UploadInput',
        then: yup
          .object()
          .shape({
            acceptedFormats: yup
              .object()
              .shape(fileTypeKeyValueSchema)
              .noUnknown(),
            multiple: yup.boolean(),
            maximumFileSize: yup.number(),
            preview: yup.boolean(),
            dropzoneText: yup.string(),
          })
          .noUnknown(),
      })
      .when('component', {
        is: 'Checkbox',
        then: yup
          .object()
          .shape({
            checkboxLabel: yup.string().required(),
          })
          .noUnknown(),
      })
      .when('component', {
        is: 'CheckboxGroup',
        then: yup
          .object()
          .shape({
            selectAll: yup.boolean(),
            options: CheckboxGroupOptionsSchema,
          })
          .noUnknown(),
      })
      .when('component', {
        is: 'Select',
        then: yup.object().shape({
          options: SelectOptionsSchema,
        }),
      })
      .when('component', {
        is: 'MultipleInputs',
        then: yup.object().shape({
          addFieldBtnText: yup.string(),
        }),
      })
      .noUnknown(),
    // options: optionsSchema,
    validationType: yup
      .string()
      .oneOf(['string', 'number', 'array', 'boolean']),
    validations: validationsFieldSchema,
  })
  .noUnknown();

const stepFieldsSchema = yup
  .array(fieldSchema)
  .required()
  .min(1, 'Minimum one field in each step is required')
  .unique((s) => s.name, '${path}: Value of property "name" is duplicated');

const jsonSchema = yup
  .object({
    formLabel: yup.string(),
    btnText: yup
      .object()
      .shape({
        submit: yup.string(),
        submitting: yup.string(),
        next: yup.string(),
        back: yup.string(),
      })
      .noUnknown(),

    steps: yup
      .array(
        yup.object().shape({
          stepLabel: yup.string(),
          fields: stepFieldsSchema,
        })
      )
      .required()
      .min(
        1,
        'Minimum one step with some fields is required for the form to be generated'
      ),
  })
  .noUnknown();

const duplicateNameSchema = yup
  .array()
  .unique((s) => s.name, 'Value of field property "name" is duplicated');

export { jsonSchema, stepFieldsSchema, fieldSchema, duplicateNameSchema };
