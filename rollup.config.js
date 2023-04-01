const { terser } = require('rollup-plugin-terser');
const babel = require('@rollup/plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('@rollup/plugin-json');

module.exports = {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
  },
  plugins: [
    terser(),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
  ],
};
