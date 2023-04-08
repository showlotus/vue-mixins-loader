const parser = require('@babel/parser');

const genImportDeclaration = (name, path) => {
  const normalizePath = path.replace(/\\/g, '/');
  const value = `import ${name} from '${normalizePath}'`;
  return value;
};

module.exports.genMixinImport = (options) => {
  const pathKeys = Object.keys(options).filter(
    (key) => key !== 'custom' && typeof options[key] === 'string'
  );
  const mixinImport = {};
  if (!pathKeys.length) {
    return {
      mixinImport,
      mixinImportNodes: []
    };
  }
  pathKeys.forEach((key) => {
    const mixinKey = `${key}Mixin`;
    mixinImport[mixinKey] = genImportDeclaration(mixinKey, options[key]);
  });
  const mixinImportAst = parser.parse(Object.values(mixinImport).join('\n'), {
    sourceType: 'module'
  });
  const mixinImportNodes = mixinImportAst.program.body;
  return {
    mixinImport,
    mixinImportNodes
  };
};

module.exports.genMixinCustom = (options) => {
  if (options.custom) {
    const customMixinAst = parser.parse(`const customMixin = ${options.custom}`, {
      sourceType: 'module'
    });
    return customMixinAst.program.body;
  }
  return [];
};

module.exports.genNewMixinNode = () => {
  const ast = parser.parse(`const customMixin = { mixins: [] }`, { sourceType: 'module' });
  return ast.program.body[0].declarations[0].init.properties[0];
};
