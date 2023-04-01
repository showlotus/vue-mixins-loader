const { terser } = require('rollup-plugin-terser');
const babel = require('@rollup/plugin-babel');

module.exports = {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    // plugins: [terser()],
  },
  plugins: [
    // babel({
    //   exclude: 'node_modules/**',
    //   // presets: ['@babel/preset-env'],
    // }),
  ],
};
