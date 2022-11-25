import { jsonSchema } from '../../model/jsonSchema';

const validateParsedJson = async (
  parsedJson: any,
  onSuccess: { (validatedJson: any): void },
  onCatch: { (error: { errors: [] }): void }
) => {
  try {
    // validate() is async
    const validatedJson = await jsonSchema.validate(parsedJson, {
      strict: true,
      abortEarly: false,
      stripUnknown: true,
    });

    onSuccess(validatedJson);
  } catch (error) {
    onCatch(error as { errors: [] });
  }
};

export { validateParsedJson };
