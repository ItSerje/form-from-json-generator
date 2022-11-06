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
        initialValues[field.name] = field.initialValue;
      } else if (!field.initialValue && field.component === 'MultipleInputs') {
        initialValues[field.name] = [''];
      } else {
        initialValues[field.name] = '';
      }
    }
  );

  return initialValues;
};
