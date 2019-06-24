import Converter from "../converter";

export type State =
  | "sleep"
  | "goingToSleep"
  | "idle"
  | "busy"
  | "espresso"
  | "steam"
  | "hotWater"
  | "shortCal"
  | "selfTest"
  | "longCal"
  | "descale"
  | "fatalError"
  | "init"
  | "noRequest"
  | "skipToNext"
  | "hotWaterRinse"
  | "steamRinse"
  | "refill"
  | "clean"
  | "inBootLoader"
  | "airPurge";

type States = { [S in State]: number };

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

  static readonly binaryDesc: BinaryDesc[] = [
    { name: "state", type: "char" },
    { name: "substate", type: "char" }
  ];

  public decode(buffer: Buffer): State {
    const { state } = this.parse(buffer, StateConverter.binaryDesc);
    const stateAsString = this.stateAsStringForValue(state);
    this.ensure(stateAsString, `Received unexpected state ${state}`);
    return stateAsString;
  }

  public encode(newState: State): Buffer {
    const buffer = Buffer.alloc(1);
    const state = StateConverter.names[newState];
    this.ensure(state, `Invalid state "${newState}"`);
    buffer.writeUInt8(state, 0);
    return buffer;
  }

  private stateAsStringForValue(state: number): State {
    for (const k in StateConverter.names)
      if (StateConverter.names[k] === state) return k as State;
  }

  private ensure(val: any, msg: string): void {
    if (typeof val === "undefined") new Error(msg);
  }
}
