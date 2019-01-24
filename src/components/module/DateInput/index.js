export interface HandleChangeDate {
  name: string;
  value: Date;
}

export interface Props {
  label: string;
  name: string;
  value: Date;
  handleChange: (data: HandleChangeDate) => void;
}

// tslint:disable-next-line
export { default } from './DateInput';
