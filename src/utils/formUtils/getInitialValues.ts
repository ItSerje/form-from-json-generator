import { TFormData } from '../../types/jsonTypes';

export const getInitialValues = (formData: TFormData) => {
  const initialValues: {
    [key: string]: any;
  } = {};

  if (!formData.fields || formData.fields.length < 1) {
    return initialValues;
  }

  formData.fields.forEach((field) => {
    // if initialValue is boolean itself, we need to make sure not to skip the below if statement
    if (field.initialValue || typeof field.initialValue === 'boolean') {
      initialValues[field.name] = field.initialValue;
    } else {
      if (field.component === 'MultipleInputs') {
        initialValues[field.name] = [''];
      } else if (field.component === 'MultipleFilesUploadField') {
        initialValues[field.name] = [];
      } else {
        initialValues[field.name] = '';
      }
    }
  });

  return initialValues;
};
