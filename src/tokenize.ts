import { tokenType } from "./type";

function escapeRegExp(str: string) {
  return str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}

export const tokenize = (template: string) => {
  const scanner = new Scanner(template);
  const tokens = [];

  const openTagRe = new RegExp(escapeRegExp('{{') + '\\s*');
  const closeTagRe = new RegExp(escapeRegExp('}}'));

  while (!scanner.isEOF()) {
    const value = scanner.scanUntil(openTagRe);

    if (value.length > 0) {
      const token = { type: tokenType.TEXT, content: value, position: scanner.position }
      tokens.push(token);
      continue;
    }

    scanner.scan(openTagRe);
    const variable = scanner.scanUntil(closeTagRe);
    const token = { type: tokenType.VAIRABLE, content: variable, position: scanner.position };
    tokens.push(token);
    scanner.scan(closeTagRe);
  }
  return tokens
}

class Scanner {
  source: string;
  tail: string;
  position: number;

  constructor(source: string) {
    this.source = source;
    this.tail = source;
    this.position = 0;
  }

  isEOF(): boolean {
    return this.position >= this.source.length;
  }

  scan(reg: RegExp) {
    const match = this.tail.match(reg);

    if (match) {
      const content = match[0];
      this.position += content.length;
      this.tail = this.tail.substring(content.length);
    }
    return match
  }

  scanUntil(reg: RegExp): string {
    const index = this.tail.search(reg);
    let match = '';

    if (index === 0) {
      match = ''
    } else if (index === -1) {
      match = this.tail;
      this.tail = '';
    } else {
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.position += match.length;
    return match;
  }
}
