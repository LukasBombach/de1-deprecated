import keyBy from "lodash.keyby";
import { Converters, Keys, Values } from "../../converters/index";
import { Events, Listener } from "../../events";
import { Service } from "../base/index";

export interface Characteristics {
  [uuid: string]: BluetoothRemoteGATTCharacteristic;
}

export default class BrowserService extends Service {
  private service: BluetoothRemoteGATTService;
  private converters: Converters;
  private characteristics: Characteristics;

  public static async load(
    service: BluetoothRemoteGATTService,
    converters: Converters
  ): Promise<BrowserService> {
    const browserService = new BrowserService(service, converters);
    await browserService.loadCharacteristics();
    return browserService;
  }

  constructor(service: BluetoothRemoteGATTService, converters: Converters) {
    super();
    this.service = service;
    this.converters = converters;
  }

  public async loadCharacteristics() {
    const characteristics = await this.service.getCharacteristics();
    this.characteristics = keyBy(characteristics, "uuid");
  }

  public async read<N extends Keys>(name: N): Promise<Values<N>> {
    const converter = this.converters[name];
    const dataView = await this.characteristics[converter.uuid].readValue();
    return converter.decode(dataView);
  }

  public async write<N extends Keys>(name: N, value: Values<N>): Promise<void> {
    const converter = this.converters[name];
    const dataView = converter.encode(value as any); // TODO any hack
    return await this.characteristics[converter.uuid].writeValue(dataView);
  }

  public on<E extends Events>(name: E, listener: Listener<E>): void {}

  public off<E extends Events>(name: E, listener?: Listener<E>): void {}
}
