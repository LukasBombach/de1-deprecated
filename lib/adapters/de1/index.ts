import { Scanner, Device, Service } from "../adapters";
import { converters, Keys, Values, State } from "./converters";
import { DE1_NAME, SERVICE_UUID } from "./settings";

export type Listener<N> = (value: Values<N>) => void;

export default class DE1 {
  private device: Device;
  private service: Service;

  public async connect(): Promise<void> {
    if (this.isConnected()) return;
    this.device = await Scanner.connect(DE1_NAME, [SERVICE_UUID]);
    this.service = await this.device.getService(SERVICE_UUID, converters);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected()) return;
    await this.device.disconnect();
    this.service = undefined;
  }

  public async turnOn(): Promise<State> {
    if (await this.isAsleep()) await this.set("state", "idle");
    return await this.get("state");
  }

  public async turnOff(): Promise<State> {
    await this.set("state", "sleep");
    return await this.get("state");
  }

  public async startEspresso(): Promise<void> {
    return await this.set("state", "espresso");
  }

  public async getWaterlevel(): Promise<number> {
    return (await this.get("water")).level;
  }

  public isConnected(): boolean {
    return this.device && this.device.isConnected();
  }

  public async get<N extends Keys>(name: N): Promise<Values<N>> {
    return await this.service.read(name);
  }

  public async set<N extends Keys>(name: N, value: Values<N>): Promise<void> {
    return await this.service.write(name, value);
  }

  public on<N extends Keys>(name: N, listener: Listener<N>): void {
    this.service.on(name, listener);
  }

  public off<N extends Keys>(name: N, listener?: Listener<N>): void {
    this.service.off(name, listener);
  }

  private async isAsleep(): Promise<boolean> {
    return "sleep" === (await this.get("state"));
  }
}
