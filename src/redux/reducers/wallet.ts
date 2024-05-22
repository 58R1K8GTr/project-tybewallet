// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';
import { WalletState } from '../../types';

import {
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  REQUEST_STARTED,
  ADD_EXPENSES,
  SUM,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE: WalletState = {
  currencies: [],
  isLoading: false,
  expenses: [],
  totalSum: 0,
};

function walletReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((item) => item.id !== action.payload),
      };
    case REQUEST_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_SUCCESSFUL:
      return {
        ...state,
        currencies: action.payload,
        isLoading: false,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case SUM:
      return {
        ...state,
        totalSum: state.totalSum + action.payload,
      };
    default:
      return state;
  }
}

export default walletReducer;
