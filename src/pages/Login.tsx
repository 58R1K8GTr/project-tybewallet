import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import { addEmail } from '../redux/actions/emailAction';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({ email: '', password: '' });

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    dispatch(addEmail(data.email));
    navigate('/carteira');
  }

  function handleChangeData(type: string, value: string) {
    const newData = { ...data, [type]: value };
    setData((prev) => ({ ...prev, [type]: value }));
    const conditions = [
      /^(\w+@[a-z-A-Z]+\.com$)/.test(newData.email),
      newData.password.length >= 6,
    ];
    setDisabled(!conditions.every((bool) => bool));
  }

  return (
    <form>
      <Input
        type="email"
        name="email-login"
        dataTestId="email-input"
        label="Email: "
        value={ data.email }
        onChange={ ({ target: { type, value } }) => handleChangeData(type, value) }
      />
      <Input
        type="password"
        name="password-login"
        dataTestId="password-input"
        label="senha: "
        value={ data.password }
        onChange={ ({ target: { type, value } }) => handleChangeData(type, value) }
      />
      <button
        type="submit"
        onClick={ (event) => handleSubmit(event) }
        disabled={ disabled }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
