import { FC, InputHTMLAttributes } from 'react';
import cl from './Input.module.scss';
import classNames from 'classnames';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return <input className={classNames(cl.input, className)} {...props} />;
};
