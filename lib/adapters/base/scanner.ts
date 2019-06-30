import Device from "./device";

export default abstract class Scanner {
  static async connect(
    deviceName: BluetoothServiceUUID,
    optionalServices?: BluetoothServiceUUID[]
  ): Promise<Device> {
    throw new Error(`${this.name}.connect has not been implemented yet`);
  }
}
