import Characteristic from "./characteristic";

export interface Characteristics {
  [uuid: string]: Characteristic;
}

export default abstract class Service {
  public abstract async discoverCharacteristics(
    timeout?: number
  ): Promise<Characteristics>;
}
