import { Data } from '../../validations/formValidations/dynamicFormValidationsGenerator';

export const getInitialValues = (data: Data) => {
  const initialValues: {
    [key: string]: any;
  } = {};

  if (!data?.fields) {
    return initialValues;
  }

  data.fields.forEach(
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
          initialValues[field.name] = [{ files: [] }];
        } else {
          initialValues[field.name] = '';
        }
      }
    }
  );
  console.log(initialValues);
  return initialValues;
};
