import { useState } from 'react';
import { InputChangeEvent } from 'common';

export const useStringField = (initialValue: string): [string, (event: InputChangeEvent) => void] => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (event: InputChangeEvent): void => {
    setValue(event.target.value);
  };

  return [value, handleChange];
};
