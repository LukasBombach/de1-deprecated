export type UUID = string;
export type DeviceName = string;

export default abstract class Characteristic {
  public abstract async read(timeout?: number): Promise<ArrayBuffer>;

  public abstract async write(
    value: ArrayBuffer,
    timeout?: number
  ): Promise<void>;

  public abstract async startNotifications(
    listener: (value: ArrayBuffer) => void
  ): Promise<void>;

  public abstract async stopNotifications(
    listener: (value: ArrayBuffer) => void
  ): Promise<void>;
}
