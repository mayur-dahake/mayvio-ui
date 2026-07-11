import { InputHTMLAttributes } from 'react';
import { InputConfig } from 'mayvio-ui/input';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, InputConfig {}
