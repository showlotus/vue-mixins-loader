const validate = (rule, targetStr) => {
  const pattern = new RegExp(rule, 'g');
  return pattern.test(targetStr);
};

// 获取 vue 文件的路径，并将反斜杠转为斜杠
const getFilePath = (str) => {
  const start = str.indexOf('!');
  const end = str.indexOf('.vue', start);
  const path = str.slice(start + 1, end + 4);
  return path.replace(/\\/g, '/');
};

/**
 * 校验当前文件是否排除
 * @param {string|string[]} rules 排除的规则
 * @param {string} currentRequest 当前文件路径
 * @returns {boolean}
 */
module.exports.validateExclude = function (rules, currentRequest) {
  if (!rules) {
    return false;
  }

  if (typeof rules === 'string') {
    rules = [rules];
  }

  const filePath = getFilePath(currentRequest);
  for (const rule of rules) {
    if (validate(rule, filePath)) {
      return true;
    }
  }

  return false;
};
