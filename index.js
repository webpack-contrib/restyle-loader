/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Daniel Verejan
*/
const path = require('path');
const loaderUtils = require('loader-utils');

module.exports = () => {};
module.exports.pitch = function pitch(remainingRequest) {
  const modulePath = path.join(__dirname, 'lib/replace-style.js');
  const moduleLoader = JSON.stringify(`!${modulePath}`);
  const request = loaderUtils.stringifyRequest(this, `!!${remainingRequest}`);

  if (this.cacheable) {
    this.cacheable();
  }

  return `// restyle-loader: Search for a stylesheet <link> in the DOM and replace/update the href',
var update = require(${moduleLoader})(
  require(${request})
);

// Hot Module Replacement
if(module.hot) {
  module.hot.accept(${request}, function() {
    update(require(${request}));
  });
  module.hot.dispose(update);
}`;
};
