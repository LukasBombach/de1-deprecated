const c = require("hex-to-array-buffer");

const chars = {
  version: new DataView(c("040901c151092c5ee0000000000000000000"))
};

class BinaryParser {
  constructor(buffer) {
    this.buffer = buffer;
    this.offset = 0;
    this.vars = {};
  }

  char(name) {
    const value = this.buffer.getUint8(this.offset, true);
    this.write(name, value);
    this.offset += 1;
    return this;
  }

  short(name) {
    const value = this.buffer.getUint16(this.offset, false);
    this.write(name, value);
    this.offset += 2;
    return this;
  }

  int(name) {
    const value = this.buffer.getUint32(this.offset, true);
    this.write(name, value);
    this.offset += 4;
    return this;
  }

  sha(name) {
    const value = this.buffer.getUint32(this.offset, true).toString(16);
    const sanitizedValue = value === "0" ? "" : value;
    this.write(name, sanitizedValue);
    this.offset += 4;
    return this;
  }

  write(path, value) {
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

const parsed = new BinaryParser(chars.version)
  .char("bluetooth.apiVersion")
  .char("bluetooth.release")
  .short("bluetooth.commits")
  .char("bluetooth.changes")
  .sha("bluetooth.sha")
  .char("firmware.apiVersion")
  .char("firmware.release")
  .short("firmware.commits")
  .char("firmware.changes")
  .sha("firmware.sha");

console.log(parsed.vars);
