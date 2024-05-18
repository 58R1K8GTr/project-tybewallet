// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (email: string) => ({
  type: ADD_EMAIL,
  payload: email,
});
