/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Daniel Verejan

  NOTE: This is used in the browser and must be ES5 compliant.
*/
/* global DEBUG: true, document: true */
/* eslint no-var: off */
function getFileName(path) {
  if (typeof path !== 'string') {
    return '';
  }

  const urlToFile = path.split('?')[0]; // eslint-disable-line prefer-destructuring
  return (urlToFile.match(/[^\\/]+\.[^\\/]+$/) || []).pop();
}

function replaceUrl(cssUrl, styleSheets) {
  var hrefFileName;
  var urlFileName;

  for (let i = 0; i < styleSheets.length; i++) {
    hrefFileName = getFileName(styleSheets[i].href);
    urlFileName = getFileName(cssUrl);

    if (hrefFileName === urlFileName) {
      styleSheets[i].href = cssUrl; // eslint-disable-line no-param-reassign
    }
  }
}

module.exports = function replaceStyleUrl(cssUrl) { // eslint-disable-line consistent-return
  var styleSheets;

  if (typeof DEBUG !== 'undefined' && DEBUG) {
    if (typeof document !== 'object') {
      throw new Error('The style-loader cannot be used in a non-browser environment');
    }
  }

  styleSheets = document.querySelectorAll("link[rel='stylesheet']");

  replaceUrl(cssUrl, styleSheets);

  if (module.hot) {
    return function hot(uri) {
      if (typeof uri === 'string') {
        replaceUrl(uri, styleSheets);
      }
    };
  }
};
