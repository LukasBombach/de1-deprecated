import { Scanner } from "../base";
import Device from "./device";

export default class BrowserScanner extends Scanner {
  static async connect(
    name: string,
    optionalServices?: BluetoothServiceUUID[]
  ): Promise<Device> {
    const filters = [{ name }];
    const options = { filters, optionalServices };
    const device = await navigator.bluetooth.requestDevice(options);
    return await Device.connect(device, optionalServices);
  }
}
