import { formJsonValidationSchema } from './formJsonValidationSchema';
import { stepFieldsSchema } from './formJsonValidationSchema';
import * as yup from 'yup';

export type Data = yup.InferType<typeof formJsonValidationSchema>;
export type StepData = yup.InferType<typeof stepFieldsSchema>;

function createYupSchema(schema: any, config: any) {
  const { name, validationType, validations = [] } = config;
  const options = config.componentSpecific?.options || [];

  //   console.log('opts', options);
  if (!(yup as any)[validationType]) {
    return schema;
  }

  const loopValidations = (validationType: string, validations: any[]) => {
    let validator = (yup as any)[validationType]();
    validations.forEach((validation: any) => {
      const { params, type } = validation;

      if (!validator[type]) {
        if (type === 'innerType') {
          validator.innerType = loopValidations(
            params.validationType,
            params.validations
          );
        }
        return;
      }

      if (
        type === 'oneOf' &&
        options.length > 0 &&
        typeof params[0] !== 'object'
      ) {
        let valuesFromOptions = options.map(
          (option: { value: string }) => option.value
        );
        valuesFromOptions = valuesFromOptions.filter(
          (value: string) => value !== ''
        );
        validator = validator[type](valuesFromOptions, ...params);
      } else {
        validator = validator[type](...params);
      }
    });

    // add typeError for catching data type errors
    validator = validator['typeError'](`Value must be a ${validationType}`);

    return validator;
  };

  schema[name] = loopValidations(validationType, validations);

  //   console.log('schema', schema);
  return schema;
}

const yupSchema = (stepData: StepData) => stepData?.reduce(createYupSchema, {});

export const dynamicFormValidationsGenerator = (stepData: StepData) =>
  yup.object().shape(yupSchema(stepData));
