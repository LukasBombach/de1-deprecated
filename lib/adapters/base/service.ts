import { Keys, Values } from "../../de1/converters";
import { Events, Listener } from "../../de1/events";

export default abstract class Service {
  public abstract async read<N extends Keys>(name: N): Promise<Values<N>>;
  public abstract async write<N extends Keys>(
    name: N,
    value: Values<N>
  ): Promise<void>;
  public abstract on<E extends Events>(name: E, listener: Listener<E>): void;
  public abstract off<E extends Events>(name: E, listener?: Listener<E>): void;
}
