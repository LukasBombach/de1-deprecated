import { UUID } from "./uuid";
import Device, { DeviceName } from "./device";

export default abstract class Scanner {
  static async connect(
    deviceName: DeviceName,
    optionalServices?: UUID[]
  ): Promise<Device> {
    throw new Error(`${this.name}.connect has not been implemented yet`);
  }
}
