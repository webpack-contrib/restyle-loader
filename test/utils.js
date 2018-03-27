
const realFs = require('fs');
const path = require('path');
const jsdom = require('jsdom/lib/old-api');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');

let compiler;
let jsdomHtml;

module.exports = {

  run(hrefList, done) {
    compiler.run((err, stats) => {
      if (stats.compilation.errors.length) {
        throw new Error(stats.compilation.errors);
      }

      const bundleJs = stats.compilation.assets['bundle.js'].source();

      // expect(1 + 2).toBe(3);
      // done();
      jsdom.env({
        html: jsdomHtml,
        src: [bundleJs],
        done: (e, window) => {
          for (const src of hrefList) {
            const regExp = new RegExp(`${src}\\?\\w{8}$`);
            const el = window.document.querySelector(`link[href*='${src}']`);

            expect(el).not.toBe(null);
            expect(el.href).toBeDefined();
            expect(regExp.test(el.href)).toBe(true);
          }

          // free memory associated with the window
          window.close();

          done();
        },
      });
    });
  },

  setup(webpackConfig, html) {
    const fs = new MemoryFS();

    jsdomHtml = html;

    // Makes webpack resolve restyle-loader to local folder instead of node_modules
    Object.assign(webpackConfig, {
      resolveLoader: {
        alias: {
          'restyle-loader': path.resolve(__dirname, '../'),
        },
      },
    });

    compiler = webpack(webpackConfig);

    // Tell webpack to use our in-memory FS
    compiler.inputFileSystem = fs;
    compiler.outputFileSystem = fs;
    compiler.resolvers.normal.fileSystem = fs;
    compiler.resolvers.context.fileSystem = fs;

    ['readFileSync', 'statSync'].forEach((fn) => {
    // Preserve the reference to original function
      fs[`mem${fn}`] = fs[fn];

      compiler.inputFileSystem[fn] = (...args) => {
        const [filePath] = args;
        // Fallback to real FS if file is not in the memoryFS
        if (fs.existsSync(filePath)) {
          return fs[`mem${fn}`](...args);
        }
        return realFs[fn](...args);
      };
    });

    return fs;
  },
};
