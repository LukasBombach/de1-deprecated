import { Converters } from "../../converters";
import { Device } from "../base";
import Service from "./service";

export default class BrowserDevice extends Device {
  private device: BluetoothDevice;
  private server: BluetoothRemoteGATTServer;

  public static async connect(
    device: BluetoothDevice,
    optionalServices?: BluetoothServiceUUID[]
  ): Promise<BrowserDevice> {
    const browserDevice = new BrowserDevice(device, optionalServices);
    await browserDevice.connect();
    return browserDevice;
  }

  constructor(
    device: BluetoothDevice,
    optionalServices?: BluetoothServiceUUID[]
  ) {
    super(device.name, optionalServices);
    this.device = device;
  }

  public async connect(timeout?: number): Promise<void> {
    this.server = await this.device.gatt.connect();
  }

  public async disconnect(timeout?: number): Promise<void> {
    await this.server.disconnect();
    this.server = undefined;
  }

  public async isConnected(): Promise<boolean> {
    return this.server && this.server.connected;
  }

  public async getService(
    uuid: BluetoothServiceUUID,
    converters: Converters,
    timeout?: number
  ): Promise<Service> {
    const service = await this.server.getPrimaryService(uuid);
    return await Service.load(service, converters);
  }
}
