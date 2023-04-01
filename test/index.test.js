const { runLoaders } = require('loader-runner');
const path = require('path');

runLoaders(
  {
    resource: path.resolve(__dirname, './demo.test.vue'),
    loaders: [
      {
        loader: path.resolve(__dirname, '../dist/index.js'),
        options: {
          tools: path.resolve('./test/vueLoaderTest/utils/tools.js'),
          // tools2: path.resolve('./test/vueLoaderTest/utils/tools.cjs'),
          // custom: {
          //   props: {
          //     block: {
          //       type: [Number, String],
          //       default: () => ({}),
          //     },
          //   },
          // },
        },
      },
    ],
  },
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result.result[0]);
    }
  }
);
