export const cutStringFromStart = (
  obj: { [x: string]: any },
  maxLength: number
) => {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      if (obj[key].length && obj[key].length > 100) {
        obj[key] = obj[key].slice(0, 100) + '...';
      }
    } else {
      cutStringFromStart(obj[key], maxLength);
    }
  }
  return obj;
};
