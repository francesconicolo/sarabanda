import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value.length >= 3) {
      const id = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(id);
      };
    }
  }, [value, delay]);

  return debouncedValue;
};
