import { AstInterface, TokenInterface, tokenType } from "./type";

export const buildAst = (tokens: TokenInterface[]) => {
  const root: AstInterface[] = [];
  const stack: AstInterface[] = [];

  tokens.forEach(token => {
    let ast: AstInterface | null = null;
    if (token.type === tokenType.TEXT) ast = { token, parent: null, children: [] };
    else ast = { token, parent: null, children: [] }

    if (stack.length > 0) {
      if (ast.token.type === tokenType.TEXT || (ast.token.type === tokenType.VAIRABLE && ast.token.content[0] !== '/')) {
        ast.parent = stack[stack.length - 1];
        stack[stack.length - 1].children.push(ast);
      }
    } else {
      root.push(ast);
    }

    if (ast.token.type === tokenType.VAIRABLE && ast.token.content[0] === '#') {
      stack.push(ast);
    } else if (ast.token.type === tokenType.VAIRABLE && ast.token.content[0] === '/') {
      if (stack.length === 0) throw new Error('wrong syntax');
      const pop = stack.pop();
      if (pop?.token.content.substring(1) !== ast.token.content.substring(1)) {
        throw new Error(`wrong nested, ${pop!.token.content}, ${ast.token.content}`);
      }
    }
  });

  return root;
}

