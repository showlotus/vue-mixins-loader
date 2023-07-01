const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const VueMixinsLoader = require('../src/index');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  cache: false,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devtool: 'inline-source-map',
  devServer: {
    // hot: true,
    // open: true,
    client: {
      logging: 'none',
      overlay: false
    }
  },
  optimization: {
    minimize: false
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        use: [
          'vue-loader',
          {
            loader: path.resolve(__dirname, '../src/index.js'),
            options: {
              exclude: ['src/components/*', 'element-ui'],
              c: path.resolve('./src/utils/c-mixin.js'),
              d: '@/utils/d-mixin.js',
              custom: VueMixinsLoader.stringify({
                props: {
                  block: {
                    type: Object,
                    default: () => ({})
                  }
                },
                mounted() {
                  console.log("this is custom mixins's mounted -----", this.$options.name);
                }
              })
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    },
    extensions: ['.js', '.jsx', '.json', '.vue']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ]
};
