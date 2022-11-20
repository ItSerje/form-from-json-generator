import {
  formJsonValidationSchema,
  noNameDuplicatesSchema,
} from './formJsonValidationSchema';

export const validateParsedJson = async (
  parsedJson: any,
  onSuccess: { (validatedJson: any): void },
  onCatch: { (error: { errors: [] }): void }
) => {
  try {
    // just to avoid duplicate code
    const validationOptions = {
      strict: true,
      abortEarly: false,
      stripUnknown: true,
    };

    // main validation happens here. validate() is async
    const validatedJson = await formJsonValidationSchema.validate(
      parsedJson,
      validationOptions
    );

    // the below is needed to make sure that there are no duplicate values of field "name" regardless of the step. the above validation doesn't provide this kind of validation
    let fields: any = [];
    parsedJson?.steps?.forEach((step: { fields: any }) =>
      fields.push(...step.fields)
    );
    await noNameDuplicatesSchema.validate(fields, validationOptions);

    onSuccess(validatedJson);
  } catch (error) {
    onCatch(error as { errors: [] });
  }
};
