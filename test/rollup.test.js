const alias = require('@rollup/plugin-alias');
const copy = require('rollup-plugin-copy');
const css = require('rollup-plugin-css-only');
const html = require('rollup-plugin-html');
const serve = require('rollup-plugin-serve');
const vue = require('rollup-plugin-vue');

module.exports = {
  input: './src/index.js', // 入口文件
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    name: 'MyComponent',
    globals: {
      vue: 'Vue' // 将 Vue.js 模块映射为全局变量名 Vue
    }
  },
  plugins: [
    alias({
      entries: [{ find: '@utils', replacement: './src/utils' }]
    }),
    // 复制静态资源
    copy({
      targets: [{ src: 'public/**/*', dest: 'dist' }]
    }),
    css(),
    html({
      fileName: 'index.html',
      template: 'index.html'
    }),
    serve({
      contentBase: 'dist',
      port: 8848,
      open: true // 自动打开浏览器
    }),
    vue({
      css: true, // 当需要自动注入 CSS 时设置为 true
      compileTemplate: true // 将 <template> 编译为 render 函数
    })
  ],
  external: ['vue'] // 将 Vue 设为外部变量，避免将其打包进组件中
};
