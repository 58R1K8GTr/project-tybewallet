import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  REQUEST_STARTED,
  REQUEST_FAILED,
  REQUEST_SUCCESSFUL,
} from './redux/actions';

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

export type InfoCurrenciesType = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type CurrenciesType = {
  USD: InfoCurrenciesType;
  CAD: InfoCurrenciesType;
  GBP: InfoCurrenciesType;
  ARS: InfoCurrenciesType;
  BTC: InfoCurrenciesType;
  LTC: InfoCurrenciesType;
  EUR: InfoCurrenciesType;
  JPY: InfoCurrenciesType;
  CHF: InfoCurrenciesType;
  AUD: InfoCurrenciesType;
  CNY: InfoCurrenciesType;
  ILS: InfoCurrenciesType;
  ETH: InfoCurrenciesType;
  XRP: InfoCurrenciesType;
  DOGE: InfoCurrenciesType;
};

type RequestStartedAction = {
  type: typeof REQUEST_STARTED;
};

type RequestSuccessfulAction = {
  type: typeof REQUEST_SUCCESSFUL;
  payload: string[];
};

type RequestFailedAction = {
  type: typeof REQUEST_FAILED;
};

export type CurrencyActionTypes =
  | RequestStartedAction
  | RequestSuccessfulAction
  | RequestFailedAction;

export type ExpensesType = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: CurrenciesType
};

export type WalletState = {
  currencies: string[];
  isLoading: false,
  expenses: ExpensesType[],
  totalSum: number,
};

export type RootState = {
  user: UserState;
  wallet: {
    currencies: string[];
    expenses: ExpensesType[];
    totalSum: number;
  };
};

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
