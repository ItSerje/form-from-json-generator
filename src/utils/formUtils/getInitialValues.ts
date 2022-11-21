import { TFormData } from '../../types/jsonTypes';

export const getInitialValues = (data: TFormData) => {
  const initialValues: {
    [key: string]: any;
  } = {};

  if (!data.steps || data.steps.length < 1) {
    return initialValues;
  }

  data.steps.forEach((step) => {
    step.fields?.forEach((field) => {
      // if initialValue is boolean itself, we need to make sure not to skip the below if
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
  });

  return initialValues;
};
