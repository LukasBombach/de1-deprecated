import StateConverter, { State } from "./state";

export { State } from "./state";

export type Keys = keyof ConverterTypes;
export type Values<Key extends Keys> = ConverterTypes[Key];

interface ConverterTypes {
  state: State;
}

export interface Converters {
  state: StateConverter;
}

const converters: Converters = {
  state: new StateConverter()
};

export default converters;
