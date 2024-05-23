import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouterAndRedux from './helpers/meuRenderWith';

const testIdLogin = 'email-input';
const testIdPassword = 'password-input';

describe('testando a rota do login', () => {
  test('testando se o login é feito com sucesso', async () => {
    const { user } = renderWithRouterAndRedux(<App />);

    const login = screen.getByTestId(testIdLogin);
    const password = screen.getByTestId(testIdPassword);
    const buttonLogin = screen.getByRole('button', { name: 'Entrar' });

    await user.type(login, 'teste@teste.com');
    await user.type(password, '123456');
    await user.click(buttonLogin);

    expect(login).not.toBeInTheDocument();
  });
  test('testando se o login não é feito com sucesso pelo input do login', async () => {
    const { user } = renderWithRouterAndRedux(<App />);

    const login = screen.getByTestId(testIdLogin);
    const password = screen.getByTestId(testIdPassword);
    const buttonLogin = screen.getByRole('button', { name: 'Entrar' });

    await user.type(login, 'teste@.com');
    await user.type(password, '123456');
    await user.click(buttonLogin);

    expect(login).toBeInTheDocument();
  });
  test('testando se o login não é feito com sucesso pelo input do password', async () => {
    const { user } = renderWithRouterAndRedux(<App />);

    const login = screen.getByTestId(testIdLogin);
    const password = screen.getByTestId(testIdPassword);
    const buttonLogin = screen.getByRole('button', { name: 'Entrar' });

    await user.type(login, 'teste@.com');
    await user.type(password, '12345');
    await user.click(buttonLogin);

    expect(login).toBeInTheDocument();
  });
  test('testando se o botão entrar habilita e desabilita corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<App />);

    const login = screen.getByTestId(testIdLogin);
    const password = screen.getByTestId(testIdPassword);
    const buttonLogin = screen.getByRole('button', { name: 'Entrar' });

    expect(buttonLogin).toBeDisabled();
    await user.type(login, 'teste@teste.com');
    await user.type(password, '123456');
    expect(buttonLogin).toBeEnabled();
    await user.click(buttonLogin);

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
  });
});
