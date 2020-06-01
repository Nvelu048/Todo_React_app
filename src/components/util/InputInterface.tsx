import { ChangeEvent } from 'react';

export interface InputInterface {
  id?: string;
  label?: string;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onSubmit?: (event: React.FormEvent<HTMLInputElement>) => void;
}
