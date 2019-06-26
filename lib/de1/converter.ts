export default abstract class Converter<T> {
  public readonly type: T;
  public abstract decode(data: DataView): T;
  public abstract encode(newState: T): DataView;
}

export interface Converters {
  [name: string]: Converter<any>;
}
