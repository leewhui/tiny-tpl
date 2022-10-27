import { AstInterface, TokenInterface, tokenType } from "./type";

export const buildAst = (tokens: TokenInterface[]) => {
  const root: AstInterface[] = [];
  const stack: AstInterface[] = [];

  tokens.forEach(token => {
    let ast: AstInterface | null = null;
    if (token.type === tokenType.TEXT) ast = { token, parent: null, children: [] };
    else ast = { token, parent: null, children: [] }

    if (stack.length > 0) {
      if (ast.token.type === tokenType.VAIRABLE && ast.token.content[0] === '/') {

      } else {
        ast.parent = stack[0];
        stack[0].children.push(ast);
      }
    } else {
      root.push(ast);
    }

    if (ast.token.type === tokenType.VAIRABLE && ast.token.content[0] === '#') {
      stack.push(ast);
    } else if (ast.token.type === tokenType.VAIRABLE && ast.token.content[0] === '/') {
      if (stack.length === 0) throw new Error('wrong syntax');
      stack.pop()
    }

  });

  return root;
}

