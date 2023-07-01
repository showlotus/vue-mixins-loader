# vue-mixins-loader

类似 `Vue.mixin` 功能的 loader，在 _Vue_ 组件打包时，注入一些公共的配置。

> 如何你对这个 _Loader_ 如何实现很感兴趣，可以戳这里 👉 [我的博客](https://showlotus.github.io/eff68783c23d.html)。

## 安装

```shell
npm install vue-mixins-loader -save-dev
```

## 配置

- 以路径的方式引入：需要以绝对路径的方式引入，或者以别名的方式引入。

```js
options: {
  // 绝对路径，使用 path.resolve 转为绝对路径
  mixin1: path.resolve('./src/utils/mixin1.js'),
  // 别名，@ 指向 ./src
  mixin2: '@/utils/mixin2.js',
}
```

- 使用自定义 `mixin` 对象，配置在 `custom` 属性中。由于 _loader_ 的 _options_ 在 _webpack_ 内部处理时，会转为 _JSON_ 格式，为确保配置能生效，需要使用 **`vue-mixins-loader`** 提供的 `stringify` 方法将其转为一个字符串类型。

```js
options: {
  custom: stringify({
    props: {
      block: {
        type: Object,
        default: () => ({})
      }
    },
    mounted() {
      console.log("this is custom mixins's mounted");
    }
  });
}
```

## 使用

在 `webpack.config.js` 中配置，需要写在 `vue-loader` 之后，也即要先于 `vue-loader` 处理。

```js
const path = require('path');
const { stringify } = require('vue-mixins-loader');

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
          {
            loader: 'vue-mixins-loader',
            options: {
              tools: path.resolve('./src/utils/tools.js'),
              tools2: path.resolve('./src/utils/tools2.js'),
              tools3: '@/utils/tools3.js',
              custom: stringify({
                props: {
                  block: {
                    type: Object,
                    default: () => ({})
                  }
                },
                mounted() {
                  console.log("this is custom mixins's mounted");
                }
              })
            }
          }
        ]
      }
    ]
  }
};
```

> _Tip_：如果对 _JS_ 类型的文件在打包时使用了 `cache-loader` ，由于缓存的存在，会导致修改 _options_ 后，配置不会生效。为确保配置能生效，请不要使用 `cache-loader`，并且配置 `cache: false` 来禁用缓存。
