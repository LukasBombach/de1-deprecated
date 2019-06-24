export default class BinaryParser<T extends {}> {
  private buffer: DataView;
  private offset: number;
  public vars: T;

  constructor(buffer: DataView) {
    this.buffer = buffer;
    this.offset = 0;
    this.vars = {};
  }

  public char(name: string) {
    const value = this.buffer.getUint8(this.offset);
    this.write(name, value);
    this.offset += 1;
    return this;
  }

  public short(name: string) {
    const value = this.buffer.getUint16(this.offset, false);
    this.write(name, value);
    this.offset += 2;
    return this;
  }

  public int(name: string) {
    const value = this.buffer.getUint32(this.offset, true);
    this.write(name, value);
    this.offset += 4;
    return this;
  }

  public sha(name: string) {
    const value = this.buffer.getUint32(this.offset, true).toString(16);
    const sanitizedValue = value === "0" ? "" : value;
    this.write(name, sanitizedValue);
    this.offset += 4;
    return this;
  }

  write(path: string, value: any) {
    const keys = path.split(".");
    const key = keys[keys.length - 1];
    let node = this.vars;
    keys.slice(0, -1).forEach(function(k) {
      if (node[k] === undefined) node[k] = {};
      node = node[k];
    });
    node[key] = value;
  }
}
