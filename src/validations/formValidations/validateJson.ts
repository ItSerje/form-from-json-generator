import { ValidationError } from 'yup';
import {
  formJsonValidationSchema,
  noNameDuplicatesSchema,
} from './formJsonValidationSchema';

export const validateParsedJson = (
  parsedJson: any,
  onSuccess: { (validatedJson: any): void },
  onCatch: { (error: { errors: [] }): void }
) => {
  try {
    const validationOptions = {
      strict: true,
      abortEarly: false,
      stripUnknown: true,
    };
    const validatedJson = formJsonValidationSchema.validateSync(
      parsedJson,
      validationOptions
    );

    let fields: any = [];
    parsedJson?.steps?.forEach((step: { fields: any }) =>
      fields.push(...step.fields)
    );
    noNameDuplicatesSchema.validateSync(fields, validationOptions);

    onSuccess(validatedJson);
  } catch (error) {
    onCatch(error as { errors: [] });
  }
};
