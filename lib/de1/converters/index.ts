import StateConverter from "./state";

export { State } from "./state";

export type Keys = keyof Converters;
export type Values<Key extends Keys> = Converters[Key];

export interface Converters {
  state: StateConverter;
}

const converters: Converters = {
  state: new StateConverter()
};

export default converters;
