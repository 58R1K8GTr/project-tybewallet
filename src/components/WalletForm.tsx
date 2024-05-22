import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Input from './Input';
import fetchCurrencies from '../redux/actions/fetchCurrenciesAction';
import { AppDispatch, CurrenciesType, ExpensesDataStateType, RootState } from '../types';
import { expensesAction } from '../redux/actions/expensesAction';
import awesomeApi from '../services/AwesomeapiAPI';
import { sumAction } from '../redux/actions/sumAction';

function WalletForm() {
  const currencies = useSelector(({ wallet }: RootState) => wallet.currencies);
  const expenses = useSelector(({ wallet }: RootState) => wallet.expenses);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const [data, setData] = useState<ExpensesDataStateType>(
    {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  );

  function handleChangeData(type: string, value: string) {
    setData((prev) => ({ ...prev, [type]: value }));
  }

  async function handleClick() {
    const currenciesData = await awesomeApi();
    const expenseData = {
      id: expenses.length,
      ...data,
      exchangeRates: currenciesData,
    };
    dispatch(expensesAction(expenseData));
    let value = Number(
      expenseData.exchangeRates[data.currency as keyof CurrenciesType].ask,
    );
    value *= Number(data.value);
    dispatch(sumAction(value));
    setData(
      {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    );
  }

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        handleClick();
      } }
    >
      <Input
        label="valor da despesa"
        name="expenditure"
        onChange={ ({ target: { value } }) => handleChangeData('value', value) }
        type="number"
        value={ String(data.value) }
        dataTestId="value-input"
        required
      />
      <Input
        label="descrição da despesa"
        name="description-expenditure"
        onChange={ ({ target: { value } }) => handleChangeData('description', value) }
        type="text"
        value={ data.description }
        dataTestId="description-input"
        required
      />
      <label htmlFor="currency-selection">
        Moeda da despesa
        { ' ' }
        <select
          name="currency"
          id="currency-selection"
          data-testid="currency-input"
          onChange={ ({ target: { value } }) => handleChangeData('currency', value) }
          defaultValue="USD"
        >
          {
            currencies && currencies.map((currency: string, index: number) => (
              <option
                key={ index }
                value={ currency }
              >
                {currency}
              </option>
            ))
          }
        </select>
      </label>
      <label htmlFor="method-selection">
        Método de pagamento
        { ' ' }
        <select
          name="method"
          id="method-selection"
          data-testid="method-input"
          onChange={ ({ target: { value } }) => handleChangeData('method', value) }
          defaultValue="Dinheiro"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="category-expenditure">
        Categoria para a despesa
        { ' ' }
        <select
          name="category-expenditure"
          id="category-expenditure"
          data-testid="tag-input"
          onChange={
            ({ target: { value } }) => handleChangeData('tag', value)
          }
          defaultValue="Alimentação"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button>
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;
