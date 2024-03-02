import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useDebounce } from 'use-debounce';

type UseInputReturn = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<string>>,
];

export const useInput = (
  initialValue: string = '',
  debounceTime?: number,
): UseInputReturn => {
  const [state, setState] = useState<string>(initialValue);
  const [debouncedState] = useDebounce(state, debounceTime ?? 1);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return [debounceTime ? debouncedState : state, onChange, setState];
};
