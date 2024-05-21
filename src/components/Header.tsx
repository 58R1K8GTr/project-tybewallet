import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const email = useSelector((state: RootState) => state.user.email);
  const total = useSelector(
    (state: RootState) => state.wallet.totalSum.toFixed(2),
  );

  return (
    <div>
      <header>
        <div className="info-div-header">
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">{ total }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    </div>
  );
}

export default Header;
