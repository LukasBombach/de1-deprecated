import { Converters } from "../../de1/converter";
import { Events, Listener } from "../../de1/events";

// https://github.com/Microsoft/TypeScript/issues/7061#issuecomment-200911748
// https://stackoverflow.com/questions/56769939/define-type-from-class-generic

export default abstract class Service<C extends Converters> {
  public abstract async read<N extends keyof C>(name: N): Promise<C[N]["type"]>;
  public abstract async write<N extends keyof C>(
    name: N,
    value: C[N]["type"]
  ): Promise<void>;
  public abstract on<E extends Events>(name: E, listener: Listener<E>): void;
  public abstract off<E extends Events>(name: E, listener?: Listener<E>): void;
}
