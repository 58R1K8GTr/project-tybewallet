import { ADD_EXPENSES } from '.';
import { ExpensesType } from '../../types';

export function expensesAction(expense: ExpensesType) {
  return {
    type: ADD_EXPENSES,
    payload: expense,
  };
}
