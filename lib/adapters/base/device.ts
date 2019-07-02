import Service from "./service";
import { Converters } from "../../converters"; // TODO illegal scope
import getCanonicalUUID from "./uuid";

export default abstract class Device {
  protected name: BluetoothServiceUUID;
  protected optionalServices: string[];

  constructor(
    name: BluetoothServiceUUID,
    optionalServices: BluetoothServiceUUID[] = []
  ) {
    this.name = name;
    this.optionalServices = optionalServices.map(getCanonicalUUID); // <-  TODO throw errors
  }

  public abstract async connect(timeout?: number): Promise<void>;
  public abstract async disconnect(timeout?: number): Promise<void>;
  public abstract async isConnected(): Promise<boolean>;

  public abstract async getService(
    uuid: BluetoothServiceUUID,
    converters: Converters,
    timeout?: number
  ): Promise<Service>;
}
