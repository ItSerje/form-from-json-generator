import { jsonSchema, fieldSchema } from '../model/jsonSchema';
import { InferType } from 'yup';

export type TFormData = InferType<typeof jsonSchema>;
export type TField = InferType<typeof fieldSchema>;
