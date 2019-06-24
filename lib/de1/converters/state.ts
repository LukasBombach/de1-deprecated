import Converter from "../converter";
import Parser from "../parser";
import Serializer from "../serializer";

interface States {
  sleep: 0x00;
  goingToSleep: 0x01;
  idle: 0x02;
  busy: 0x03;
  espresso: 0x04;
  steam: 0x05;
  hotWater: 0x06;
  shortCal: 0x07;
  selfTest: 0x08;
  longCal: 0x09;
  descale: 0x0a;
  fatalError: 0x0b;
  init: 0x0c;
  noRequest: 0x0d;
  skipToNext: 0x0e;
  hotWaterRinse: 0x0f;
  steamRinse: 0x10;
  refill: 0x11;
  clean: 0x12;
  inBootLoader: 0x13;
  airPurge: 0x14;
}

export interface ParseResult {
  state: number;
  substate: number;
}

export type State = keyof States;

export default class StateConverter extends Converter {
  public static readonly names: States = {
    sleep: 0x00,
    goingToSleep: 0x01,
    idle: 0x02,
    busy: 0x03,
    espresso: 0x04,
    steam: 0x05,
    hotWater: 0x06,
    shortCal: 0x07,
    selfTest: 0x08,
    longCal: 0x09,
    descale: 0x0a,
    fatalError: 0x0b,
    init: 0x0c,
    noRequest: 0x0d,
    skipToNext: 0x0e,
    hotWaterRinse: 0x0f,
    steamRinse: 0x10,
    refill: 0x11,
    clean: 0x12,
    inBootLoader: 0x13,
    airPurge: 0x14
  };

  public decode(data: DataView): State {
    const { state } = this.parse(data);
    const stateName = this.stateAsStringForValue(state);
    if (typeof stateName === "undefined")
      new Error(`Received unexpected state ${state}`);
    return stateName;
  }

  public encode(state: State): DataView {
    const stateValue = StateConverter.names[state];
    if (typeof stateValue === "undefined") new Error(`Unknow state "${state}"`);
    return new Serializer()
      .char(StateConverter.names[state])
      .char(0x00)
      .dataView();
  }

  private parse(data: DataView): ParseResult {
    return new Parser<ParseResult>(data)
      .char("state")
      .char("substate")
      .vars();
  }

  private stateAsStringForValue(state: number): State {
    for (const k in StateConverter.names)
      if (StateConverter.names[k] === state) return k as State;
  }
}
