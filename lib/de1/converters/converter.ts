import { parse, Results, Vars } from "binary";

export interface ParsedBinary {
  [name: string]: any;
}

interface BinDescMap {
  [type: string]: string;
}

interface Obj {
  [key: string]: any;
}

const binDescMap: BinDescMap = {
  char: "word8lu",
  int: "word32lu",
  intSigned: "word32ls",
  short: "word16bu"
};

export interface BinaryDesc {
  name: string;
  type: string;
  process?: (value: number) => any;
}

export default abstract class Converter {
  public abstract decode(buffer: Buffer): any;
  public abstract encode(newState: any): Buffer;

  parse(buffer: Buffer, descriptions: BinaryDesc[]): ParsedBinary {
    const initialBin = parse(buffer);
    const results = descriptions.reduce(chainBinary, initialBin).vars;
    const processedResults = this.processResults(descriptions, results);
    return processedResults;
  }

  chainBinary(bin: Results, { type, name }: BinaryDesc) {
    const parseFn = binDescMap[type];
    return bin[parseFn](name);
  }

  processResults(descs: BinaryDesc[], results: Vars): ParsedBinary {
    const processors = descs.filter(desc => typeof desc.process === "function");
    processors.forEach(({ name, process }) =>
      this.callProcess(results, process as Function, name)
    );
    return results;
  }

  callProcess(results: Vars, process: Function, path: string) {
    const valPath = path.split(".");
    const objPath = valPath.slice(0, -1);
    const valName = valPath.slice(-1)[0];
    const obj = objPath.length
      ? this.getNestedValue(results, objPath)
      : results;
    obj[valName] = process(obj[valName]);
  }

  getNestedValue(baseObj: Obj, pathArr: string[]) {
    const isUndef = (o: Obj, k: string) => o && o[k] !== "undefined";
    const getKey = (o: Obj, k: string) => (isUndef(o, k) ? o[k] : undefined);
    return pathArr.reduce(getKey, baseObj);
  }
}
