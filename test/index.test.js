const path = require('path');
const { runLoaders } = require('loader-runner');
const fsPromises = require('fs').promises;
// const VueMixinsLoader = require('../src/index');
const VueMixinsLoader = require('../dist/index');

const custom = VueMixinsLoader.stringify({
  custom: 'custom-mixin',
  props: {
    block: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    console.log("this is VueMixinsLoader's mounted.");
  }
});

runLoaders(
  {
    resource: path.resolve(__dirname, './src/Test.vue'),
    loaders: [
      {
        loader: path.resolve(__dirname, '../dist/index.js'),
        options: {
          c: '@utils/c-mixin.js',
          d: path.resolve('./src/utils/d-mixin.js'),
          custom: custom
        }
      }
    ]
  },
  async (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const newContent = result.result[0];

      await fsPromises.writeFile(path.resolve(__dirname, './src/NewTest.vue'), newContent, {
        encoding: 'utf-8'
      });

      console.log('NewTest.vue 已重新生成');
    }
  }
);
