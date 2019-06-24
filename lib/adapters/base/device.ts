import Service from "./service";
import getCanonicalUUID, { UUID } from "./uuid";

export type DeviceName = string | UUID;

export abstract class Device {
  private name: DeviceName;
  private optionalServices: string[];

  constructor(name: DeviceName, optionalServices: UUID[] = []) {
    this.name = name;
    this.optionalServices = optionalServices.map(getCanonicalUUID); // <-  TODO throw errors
  }

  public abstract async connect(timeout?: number): Promise<this>;

  public abstract async getService<UUIDs = UUID | UUID[]>(
    uuids: UUIDs,
    timeout?: number
  ): Promise<UUIDs extends UUID[] ? Service[] : Service>;
}
