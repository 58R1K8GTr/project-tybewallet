import { InputProp } from '../types';

function Input(
  {
    type,
    name,
    label,
    onChange,
    value,
    required = false,
    dataTestId = '',
  }: InputProp,
) {
  return (
    <label
      htmlFor={ name }
    >
      { label }
      <input
        { ...(dataTestId && { 'data-testid': dataTestId }) }
        type={ type }
        name={ name }
        value={ value }
        onChange={ onChange }
        id={ name }
        required={ required }
      />
    </label>
  );
}

export default Input;
