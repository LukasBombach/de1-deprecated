import Service from "./service";
import { UUID } from "./uuid";

export type DeviceName = string | UUID;

export abstract class Adapter {
  public static async connect(
    name: DeviceName,
    optionalServices: UUID | UUID[],
    timeout?: number
  ): Promise<Adapter> {
    throw new Error(`connect has not been implemented by ${this.name}`);
  }

  public abstract async getServices<UUIDArray = UUID | UUID[]>(
    uuids: UUIDArray,
    timeout?: number
  ): Promise<UUIDArray extends UUID[] ? Service[] : Service>;
}
