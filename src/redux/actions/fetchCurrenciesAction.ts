import { AppDispatch } from '../../types';
import {
  requestStarted,
  requestSuccessful,
  requestFailure,
} from './currenciesActions';
import awesomeApi from '../../services/AwesomeapiAPI';

function fetchCurrencies() {
  return async (dispatch: AppDispatch) => {
    dispatch(requestStarted());
    try {
      const data = await awesomeApi();
      const dataArray = Object.keys(data);
      const dataFiltered: string[] = dataArray.filter((item) => item !== 'USDT');
      dispatch(requestSuccessful(dataFiltered));
    } catch (error) {
      dispatch(requestFailure());
    }
  };
}

export default fetchCurrencies;
