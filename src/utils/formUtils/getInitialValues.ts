import { Data } from '../../validations/formValidations/dynamicFormValidationsGenerator';

export const getInitialValues = (data: Data) => {
  const initialValues: {
    [key: string]: any;
  } = {};

  if (!data?.fields || !data.fields || data.fields.length < 1) {
    return initialValues;
  }

  data.fields.forEach((step) => {
    step?.forEach(
      (field: { component: string; name: string; initialValue?: any }) => {
        if (field.initialValue || typeof field.initialValue === 'boolean') {
          // if (typeof field.initialValue === 'boolean') {
          //   initialValues[field.name] = field.initialValue;
          // } else {
          //   initialValues[field.name] = field.initialValue;
          // }
          initialValues[field.name] = field.initialValue;
        } else {
          if (field.component === 'MultipleInputs') {
            initialValues[field.name] = [''];
          } else if (field.component === 'MultipleFilesUploadField') {
            // initialValues[field.name] = [{ files: [] }];
            initialValues[field.name] = [];
          } else {
            initialValues[field.name] = '';
          }
        }
      }
    );
  });

  console.log(initialValues);
  return initialValues;
};
