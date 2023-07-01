const { parse } = require('@vue/compiler-dom');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { getOptions, getCurrentRequest } = require('loader-utils');
const { omit } = require('lodash');
const { genMixinCustom, genMixinImport, genNewMixinNode } = require('./utils/generate');
const { stringify } = require('./utils/stringify');
const { validateExclude } = require('./utils/validateExclude');

const handler = function (source, sourceMaps) {
  const originOptions = getOptions(this);
  const { exclude } = originOptions;
  const currentRequest = getCurrentRequest(this);
  // 校验是否排除当前文件
  if (validateExclude(exclude, currentRequest)) {
    return source;
  }

  // 排除 exclude 属性
  const options = omit(originOptions, 'exclude');
  if (!Object.keys(options).length) return source;

  const sourceAST = parse(source);
  const script = sourceAST.children.find((v) => v.tag === 'script');
  const [startTag, endTag] = [script.loc.start.offset, script.loc.end.offset];
  const scriptTag = source.slice(startTag, endTag);
  const scriptContent = scriptTag.replace(/^<script>|<\/script>$/g, '');

  const start = startTag + '<script>'.length;
  const end = endTag - '</script>'.length;

  // custom 配置
  const customMixinNodes = genMixinCustom(options);
  // import mixin 配置
  const mixinImportInfo = genMixinImport(options);

  const scriptAst = parser.parse(scriptContent, { plugins: ['jsx'], sourceType: 'module' });
  const newImportNodes = mixinImportInfo.mixinImportNodes;
  traverse(scriptAst, {
    ImportDeclaration(path) {
      // 收集所有的 import 节点
      scriptAst.program.body = scriptAst.program.body.filter((node) => {
        return node !== path.node;
      });
      newImportNodes.push(path.node);
    },
    ExportDefaultDeclaration(path) {
      const properties = path.node.declaration.properties;
      // 既没有 customMixin 也没有从外部引入 importMixin
      if (!customMixinNodes.length && !mixinImportInfo.mixinImportNodes.length) return;
      let mixins = properties.find((property) => property.key.name === 'mixins');
      // 是否有 mixins 配置
      if (!mixins) {
        mixins = genNewMixinNode();
        properties.unshift(mixins);
      }
      const newMixins = Object.keys(mixinImportInfo.mixinImport);
      if (customMixinNodes.length) {
        newMixins.push('customMixin');
      }
      const genMixinsElements = newMixins.map((key) => ({
        type: 'Identifier',
        name: key
      }));
      mixins.value.elements.push(...genMixinsElements);
    }
  });
  newImportNodes.push(...customMixinNodes);
  // 插入 mixin 节点
  scriptAst.program.body.unshift(...newImportNodes);

  const newScript = generate(scriptAst).code;
  const newSource = source.slice(0, start) + `\n${newScript}\n` + source.slice(end);
  return newSource;
};

module.exports = handler;
module.exports.stringify = stringify;
