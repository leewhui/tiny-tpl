import { AstInterface, TokenInterface, tokenType } from "./type";

export const render = (asts: AstInterface[], data: Record<string, any>) => {
  let output = ``;
  asts.forEach(ast => {
    output += renderAst(ast, data);
  })
  return output;
}

const renderAst = (ast: AstInterface, data: Record<string, any>) => {
  let output = '';
  const token = ast.token;
  const content = token.content;
  if (ast.children.length === 0) {
    if (token.type === tokenType.TEXT) output += content;
    if (token.type === tokenType.VAIRABLE) output += renderVariable(token, data);
    return output;
  } else {
    const key = token.content.substring(1);
    const values = data[key];
    if (Array.isArray(values)) {
      values.forEach(value => {
        ast.children.forEach((child) => {
          if (typeof value !== 'object') value = { $: value }
          output += renderAst(child, Object.assign({}, data, value));
        });
      });
    } else if (typeof values === 'function') {
      const func = values;
      ast.children.forEach((child) => {
        if (child.token.type === tokenType.TEXT) output += child.token.content;
        else output += func(renderAst(child, data))
      })
    }
  }
  return output;
}

const renderVariable = (token: TokenInterface, data: Record<string, any>) => {
  const names = token.content.split('.');
  if (names.length === 0) return '';
  let initValue = data[names[0]];
  for (let i = 1; i < names.length; i++) {
    initValue = initValue[names[i]];
  }
  return typeof initValue === 'function' ? initValue() : initValue;
}
