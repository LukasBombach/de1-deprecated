import c from "hex-to-array-buffer";

export interface Characteristics {
  a001: Characteristic;
  a002: Characteristic;
  a003: Characteristic;
  a004: Characteristic;
  a005: Characteristic;
  a006: Characteristic;
  a007: Characteristic;
  a008: Characteristic;
  a009: Characteristic;
  a00a: Characteristic;
  a00b: Characteristic;
  a00c: Characteristic;
  a00d: Characteristic;
  a00e: Characteristic;
  a00f: Characteristic;
  a010: Characteristic;
  a011: Characteristic;
  a012: Characteristic;
}

export interface Characteristic {
  properties: Properties;
  value: ArrayBuffer;
}

export type Properties = "R" | "W" | "RW";

// prettier-ignore
const characteristics: Characteristics = {
  a001:	{ properties: "R",  value: c("040901c151092c5ee000000000000000000") },
  a002:	{ properties: "RW", value: c("02") },
  a003:	{ properties: "RW", value: c("0000000000000000") },
  a004:	{ properties: "R",  value: c("000000000000000000000000000000000000000000000000") },
  a005:	{ properties: "RW", value: c("0000000000000000000000000000000000000000") },
  a006:	{ properties: "W",  value: c("" )},
  a007:	{ properties: "W",  value: c("" )},
  a008:	{ properties: "W",  value: c("" )},
  a009:	{ properties: "W",  value: c("" )},
  a00a:	{ properties: "R",  value: c("00000000000000000000000000000000") },
  a00b:	{ properties: "RW", value: c("026040b09e000400") },
  a00c:	{ properties: "RW", value: c("00000500") },
  a00d:	{ properties: "R",  value: c("0000000000000000000000000000") },
  a00e:	{ properties: "R",  value: c("00a03c50503cc85800") },
  a00f:	{ properties: "RW", value: c("0000000000000000000000000000000000000000") },
  a010:	{ properties: "RW", value: c("de4d0001000014b81515c1500058000030021d") },
  a011:	{ properties: "RW", value: c("0000") },
  a012:	{ properties: "RW", value: c("0103010060") }
};

export default characteristics;
