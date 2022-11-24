import { useState } from 'react';

const useForceComponentUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

export { useForceComponentUpdate };
