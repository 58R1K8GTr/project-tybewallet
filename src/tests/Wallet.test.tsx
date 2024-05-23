import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouterAndRedux from './helpers/meuRenderWith';
import mockData from './helpers/mockData';

describe('testes da carteira', () => {
  test('testando se é adicionado um item na tabela', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockData,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const { user } = renderWithRouterAndRedux(<App />, '/carteira');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    const testName = 'testando uma coisa rapidinho';

    await user.type(valueInput, '1');
    await user.type(descriptionInput, testName);
    await user.selectOptions(currencyInput, 'CAD');
    await user.selectOptions(methodInput, 'Cartão de crédito');
    await user.selectOptions(tagInput, 'Lazer');
    await user.click(buttonAdd);

    const firstItemInTheTable = screen.getByText(testName);
    expect(firstItemInTheTable).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
