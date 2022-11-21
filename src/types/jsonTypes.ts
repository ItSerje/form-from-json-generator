import { jsonSchema, stepFieldsSchema, fieldSchema } from '../model/jsonSchema';
import { InferType } from 'yup';

export type TData = InferType<typeof jsonSchema>;
export type TStepData = InferType<typeof stepFieldsSchema>;
export type TField = InferType<typeof fieldSchema>;
