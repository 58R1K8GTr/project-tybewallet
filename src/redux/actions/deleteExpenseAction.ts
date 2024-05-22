import { DELETE_EXPENSE } from '.';

export function deleteExpenseAction(id: number, value: number) {
  return {
    type: DELETE_EXPENSE,
    payload: [id, value],
  };
}
