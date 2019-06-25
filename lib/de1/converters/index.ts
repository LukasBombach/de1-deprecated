import StateConverter from "./state";
import WaterConverter from "./water";

export { State } from "./state";

export type Keys = keyof Converters;
export type Values<Key extends Keys> = Converters[Key]["type"];

export interface Converters {
  state: StateConverter;
  water: WaterConverter;
}

const converters: Converters = {
  state: new StateConverter(),
  water: new WaterConverter()
};

export default converters;
