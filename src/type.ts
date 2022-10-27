export enum tokenType {
  VAIRABLE = 'variable',
  TEXT = 'text',
}

export interface TokenInterface {
  content: string;
  type: tokenType;
  position: number;
}

export interface AstInterface {
  token: TokenInterface;
  children: AstInterface[];
  parent: AstInterface | null;
}
