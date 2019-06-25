// import { Keys, Values } from "../../de1/converters";
import { Events, Listener } from "../../de1/events";

// https://github.com/Microsoft/TypeScript/issues/7061#issuecomment-200911748

module Service {
  type Keys = keyof Converters;
  type Values<Key extends Keys> = Converters[Key]["type"];
}

export default abstract class Service<Converters extends> {
  public abstract async read<N extends Keys>(name: N): Promise<Values<N>>;
  public abstract async write<N extends Keys>(
    name: N,
    value: Values<N>
  ): Promise<void>;
  public abstract on<E extends Events>(name: E, listener: Listener<E>): void;
  public abstract off<E extends Events>(name: E, listener?: Listener<E>): void;
}
