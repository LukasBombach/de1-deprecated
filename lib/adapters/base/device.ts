import Service from "./service";
import { Converters } from "../../de1/converters"; // TODO illegal scope
import getCanonicalUUID, { UUID } from "./uuid";

export type DeviceName = string | UUID;

export default abstract class Device {
  private name: DeviceName;
  private optionalServices: string[];

  constructor(name: DeviceName, optionalServices: UUID[] = []) {
    this.name = name;
    this.optionalServices = optionalServices.map(getCanonicalUUID); // <-  TODO throw errors
  }

  public abstract async connect(timeout?: number): Promise<void>;
  public abstract async disconnect(timeout?: number): Promise<void>;
  public abstract async isConnected(): Promise<boolean>;

  public abstract async getService<T extends UUID | UUID[]>(
    uuids: T,
    converters: Converters,
    timeout?: number
  ): Promise<T extends UUID ? Service : Service[]>;
}
