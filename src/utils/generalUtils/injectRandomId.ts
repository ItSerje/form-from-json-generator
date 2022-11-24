import { v4 as uuidv4 } from 'uuid';

export const injectRandomId = (object: any) => {
  object.id = uuidv4();
  return object;
};
