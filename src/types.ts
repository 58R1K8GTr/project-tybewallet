export type InputProp = {
  type: string;
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  dataTestId?: string;
};

export type UserState = {
  email: string;
};

export type RootState = {
  user: UserState;
};
