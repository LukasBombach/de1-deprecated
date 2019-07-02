import { Scanner } from "../base";
import Device from "./device";

export default class BrowserScanner extends Scanner {
  static async connect(
    deviceName: BluetoothServiceUUID, // TODO param name should match BLE spec
    optionalServices?: BluetoothServiceUUID[]
  ): Promise<Device> {
    const filters = [{ name: deviceName as string }];
    const options = { filters, optionalServices };
    const device = await navigator.bluetooth.requestDevice(options);
    return await Device.connect(device, optionalServices);
  }
}
