const serialize = require('serialize-javascript');

const toString = (val) => {
  return Object.prototype.toString.call(val);
};

const isFunction = (val) => {
  return toString(val).slice(8, -1) === 'Function';
};

const isObject = (val) => {
  return toString(val).slice(8, -1) === 'Object';
};

const isConstructorFn = (val) => {
  const PropType = [String, Number, Boolean, Array, Object, Date, Function, Symbol];
  const PropTypeStr = [
    'function String() { [native code] }',
    'function Number() { [native code] }',
    'function Boolean() { [native code] }',
    'function Array() { [native code] }',
    'function Object() { [native code] }',
    'function Date() { [native code] }',
    'function Function() { [native code] }',
    'function Symbol() { [native code] }',
  ];
  const validate = (val) => isFunction(val) && PropTypeStr.includes(val.toString());
  const genConstructorStr = (val) => {
    return val
      .toString()
      .match(/^function\s([^(]+)/g)[0]
      .slice(9);
  };
  if (Array.isArray(val)) {
    if (val.every(validate)) {
      return `__ConstructorFn([${val.map(genConstructorStr).join(', ')}])`;
    }
  } else {
    if (validate(val)) {
      return `__ConstructorFn(${genConstructorStr(val)})`;
    }
  }
  return;
};

const removeConstructorFnTag = (str) => {
  return str.replace(/['"]__ConstructorFn\(([^)]+)\)['"]/g, '$1');
};

module.exports.stringify = (obj) => {
  const handleConstructorVal = (obj) => {
    let str;
    Object.keys(obj).forEach((key) => {
      if ((str = isConstructorFn(obj[key]))) {
        obj[key] = str;
      }
      if (isObject(obj[key])) {
        handleConstructorVal(obj[key]);
      }
    });
  };
  handleConstructorVal(obj);
  const res = serialize(obj, { space: 2 });
  return removeConstructorFnTag(res);
};
