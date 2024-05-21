import {
  REQUEST_FAILED,
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
} from '.';

import { CurrencyActionTypes } from '../../types';

export function requestStarted(): CurrencyActionTypes {
  return { type: REQUEST_STARTED };
}

export function requestSuccessful(currencies: string[]): CurrencyActionTypes {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

export function requestFailure(): CurrencyActionTypes {
  return {
    type: REQUEST_FAILED,
  };
}
