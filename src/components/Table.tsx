import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { deleteExpenseAction } from '../redux/actions/deleteExpenseAction';

function Table() {
  const expenses = useSelector(
    (state: RootState) => state.wallet.expenses,
  );
  const dispatch = useDispatch();

  function handleClickDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const { className } = event.target as HTMLButtonElement;
    const id = Number(className);
    const expense = expenses.find((item) => item.id === id);
    if (expense) {
      const value = Number(expense.value);
      const { ask } = expense.exchangeRates[expense.currency];
      dispatch(
        deleteExpenseAction(id, value * Number(ask)),
      );
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map(
              ({ id, description, tag, method, value, currency, exchangeRates }) => {
                const { name, ask } = exchangeRates[currency];
                return (
                  <tr key={ `${description}${tag}` }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ Number(value).toFixed(2) }</td>
                    <td>{ name }</td>
                    <td>{ Number(ask).toFixed(2) }</td>
                    <td>{ (Number(value) * Number(ask)).toFixed(2) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="delete-btn"
                        className={ String(id) }
                        onClick={ (event) => handleClickDelete(event) }
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                );
              },
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
