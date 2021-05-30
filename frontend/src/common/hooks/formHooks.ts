import { useState } from 'react';
import { FieldChangeEvent } from 'common/types';

export const useStringField = (initialValue: string): [string, (event: FieldChangeEvent) => void] => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (event: FieldChangeEvent): void => {
    setValue(event.target.value);
  };

  return [value, handleChange];
};
