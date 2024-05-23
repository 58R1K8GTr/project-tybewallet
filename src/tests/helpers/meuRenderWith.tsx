import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../../redux/reducers';

function renderWithRouterAndRedux(
  component: JSX.Element,
  route: string = '/',
  store = createStore(rootReducer, applyMiddleware(thunk)),
) {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(
      <BrowserRouter>
        <Provider store={ store }>{component}</Provider>
      </BrowserRouter>,
    ),
    user: userEvent.setup(),
    store,
  };
}

export default renderWithRouterAndRedux;
