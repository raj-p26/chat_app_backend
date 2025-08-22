import fs from "fs";
import { stdout, stderr } from "process";

export class Logger {
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  private _getColoredTag(): string {
    return `\x1b[90m${this.tag}\x1b[0m`;
  }

  info(msg: any) {
    fs.writeSync(stdout.fd, `\x1b[1;94m[INFO]\x1b[0m: ${msg} ${this._getColoredTag()}\n`);
  }

  error(msg: any) {
    fs.writeSync(stderr.fd, `\x1b[1;31m[ERROR]\x1b[0m: ${msg} ${this._getColoredTag()}\n`);
  }

  log(msg: any) {
    fs.writeSync(stdout.fd, `\x1b[1;32m[LOG]\x1b[0m: ${msg} ${this._getColoredTag()}\n`);
  }

  warn(msg: any) {
    fs.writeSync(stdout.fd, `\x1b[1;33m[WARN]\x1b[0m: ${msg} ${this._getColoredTag()}\n`);
  }
}
