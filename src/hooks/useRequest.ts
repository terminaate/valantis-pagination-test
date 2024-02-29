import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type LoadingReturn = [
  true,
  undefined,
  () => void,
  Dispatch<SetStateAction<undefined>>,
];

type DoneReturn<T> = [
  false,
  T,
  () => void,
  Dispatch<SetStateAction<T | undefined>>,
];

export type UseRequestReturn<T> = LoadingReturn | DoneReturn<T>;

export const useRequest = <T>(cb: () => Promise<T>): UseRequestReturn<T> => {
  const [response, setResponse] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  const triggerCb = () => {
    setIsLoading(true);

    cb()
      .then(setResponse)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(triggerCb, []);

  return [isLoading, response, triggerCb, setResponse] as UseRequestReturn<T>;
};
