export interface Characteristics {
  [uuid: string]: Characteristic;
}

export abstract class Adapter {
  public static async connect(
    name: string | RegExp,
    timeout?: number
  ): Promise<Adapter> {
    throw new Error(`connect has not been implemented by ${this.name}`);
  }

  public abstract async getService(
    uuid: string,
    timeout?: number
  ): Promise<Service>;
}

export abstract class Service {
  public abstract async getCharacteristics(
    timeout?: number
  ): Promise<Characteristics>;
}

export abstract class Characteristic {
  public abstract async read(
    uuid: string,
    timeout?: number
  ): Promise<ArrayBuffer>;

  public abstract async write(
    uuid: string,
    value: ArrayBuffer,
    timeout?: number
  ): Promise<void>;
}
