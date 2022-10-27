import { tokenize } from './tokenize';
import { render } from './render';
import { buildAst } from './ast';

export const template = (template: string, data: Record<string, any>) => {
  const tokens = tokenize(template);
  const ast = buildAst(tokens);
  return render(ast, data);
}
