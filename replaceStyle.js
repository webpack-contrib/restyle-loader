/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Daniel Verejan
*/
function getFileName(path) {
	if (typeof path !== "string") {
		return "";
	}

	var urlToFile = path.split("?")[0];
	return (urlToFile.match(/[^\\/]+\.[^\\/]+$/) || []).pop();
}

function replaceUrl(cssUrl, styleSheets) {
	for (var i = 0; i < styleSheets.length; i++) {
		var hrefFileName = getFileName(styleSheets[i].href);
		var urlFileName = getFileName(cssUrl);

		if (hrefFileName === urlFileName) {
			styleSheets[i].href = cssUrl;
		}
	}
}

module.exports = function replaceStyleUrl(cssUrl) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") {
			throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	}

	var styleSheets = document.querySelectorAll("link[rel='stylesheet']");

	replaceUrl(cssUrl, styleSheets);

	if(module.hot) {
		return function(cssUrl) {
			if(typeof cssUrl === "string") {
				replaceUrl(cssUrl, styleSheets);
			}
		};
	}
};
