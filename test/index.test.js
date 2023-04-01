const { runLoaders } = require('loader-runner');
const fsPromises = require('fs').promises;
const path = require('path');
const diff = require('diff');

const sourcePath = path.resolve(__dirname, './demo.vue');

runLoaders(
  {
    resource: sourcePath,
    loaders: [
      {
        loader: path.resolve(__dirname, '../src/index.js'),
        options: {
          tools: path.resolve('./test/vueLoaderTest/utils/tools.js'),
          tools2: path.resolve('./test/vueLoaderTest/utils/tools.cjs'),
          custom: {
            props: {
              block: {
                type: [Number, String],
                default: () => ({}),
              },
            },
          },
        },
      },
    ],
  },
  async (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const newContent = result.result[0];

      const sourceContent = (await fsPromises.readFile(sourcePath, { encoding: 'utf-8' })).replace(
        /\n\s*\n/g,
        '\n'
      );
      await fsPromises.writeFile(path.resolve(__dirname, './newDemo.vue'), newContent, {
        encoding: 'utf-8',
      });

      const diffResult = diff.diffChars(sourceContent, newContent);
      diffResult.forEach((part) => {
        const color = part.added ? '\x1b[32m' : '\x1b[90m';
        // if (part.value === '\n') {
        //   process.stdout.write(' \n');
        // } else {
        // }
        process.stdout.write(color + part.value);
      });
    }
  }
);
