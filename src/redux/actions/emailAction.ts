import { ADD_EMAIL } from '.';

export const addEmail = (email: string) => ({
  type: ADD_EMAIL,
  payload: email,
});
