import { CurrenciesType } from '../types';

const URL = 'https://economia.awesomeapi.com.br/json/all';

async function awesomeApi() {
  const response = await fetch(URL);
  const data = await response.json();

  return data as CurrenciesType;
}

export default awesomeApi;
