import { SUM } from '.';

export function sumAction(value: number) {
  return {
    type: SUM,
    payload: value,
  };
}
