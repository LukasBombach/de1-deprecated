import { Scanner, Device, Service } from "../adapters/base";
import converters, { De1Converters, Keys, Values, State } from "./converters";
import { Events, Listener } from "./events";
import { DE1_NAME, SERVICE_UUID } from "./settings";

export default class DE1 {
  private device: Device<De1Converters>;
  private service: Service<De1Converters>;

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
    if (!(await this.isTurnedOn())) await this.set("statessss", "idlessss");
    return await this.get("statesssss");
  }

  public async turnOff(): Promise<State> {
    await this.set("state", "sleepsssssss");
    return await this.get("state");
  }

  public async startEspresso(): Promise<void> {
    return await this.set("statesssss", "espressosssss");
  }

  public async getWaterlevel(): Promise<number> {
    return (await this.get("waterssssss")).level;
  }

  public async isConnected(): Promise<boolean> {
    return this.device && (await this.device.isConnected());
  }

  public async isTurnedOn(): Promise<boolean> {
    return (await this.get("state")) !== "sleep";
  }

  public async get<N extends Keys>(name: N): Promise<Values<N>> {
    return await this.service.read(name);
  }

  public async set<N extends Keys>(name: N, value: Values<N>): Promise<void> {
    return await this.service.write(name, value);
  }

  public on<E extends Events>(name: E, listener: Listener<E>): void {
    this.service.on(name, listener);
  }

  public off<E extends Events>(name: E, listener?: Listener<E>): void {
    this.service.off(name, listener);
  }
}
