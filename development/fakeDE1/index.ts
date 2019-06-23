import services, { Services, Service } from "./services";
import characteristics, { Characteristics } from "./characteristics";

export default class FakeDE1 {
  public async getService(uuid: keyof Services): Promise<Service> {
    return Promise.resolve(services[uuid]);
  }

  public async getCharacteristics(): Promise<Characteristics> {
    return Promise.resolve(characteristics);
  }
}
