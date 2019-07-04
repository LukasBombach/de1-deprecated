import Converter from "../converter";
import Parser from "../parser";
import Serializer from "../serializer";

export interface Water {
  level: number;
  startFillLevel: number;
}

export default class WaterConverter extends Converter<Water> {
  public readonly uuid = "0000a011-0000-1000-8000-00805f9b34fb";
  //public readonly uuid = "a011";

  public decode(data: DataView): Water {
    return new Parser<Water>(data)
      .short("level", 256)
      .short("startFillLevel", 256)
      .vars();
  }

  public encode(state: Water): DataView {
    return new Serializer()
      .short(state.level * 256)
      .short(state.startFillLevel * 256)
      .dataView();
  }
}
