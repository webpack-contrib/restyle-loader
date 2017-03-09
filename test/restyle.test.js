// Node v4 requires "use strict" to allow block scoped let & const
"use strict";

import {setup, runCompilerTest} from "./utils";
import path from "path";
var fs;

test("adds 1 + 2 to equal 3", () => {
	expect(1 + 2).toBe(3);
});

describe("Main test", () => {
	const requiredCss = ".required { color: blue }";
	const styleHref = "style.css";
	const secondStyleHref = "secondStyle.css";
	const hrefList = [styleHref, secondStyleHref];
	const rootDir = path.resolve(__dirname + "/../") + "/"; 
	const jsdomHtml = `
		<html>
			<head>
				<link rel="stylesheet" type="text/css" href="${styleHref}">
				<link rel="stylesheet" type="text/css" href="${secondStyleHref}">
			</head>
			<body></body>
		</html>
	`;

	const defaultCssRule = {
		test: /\.css?$/,
		use: [
			{
				loader: "restyle-loader"
			},
			{
				loader: "file-loader",
				options: {
					name: "[name].css?[hash:8]"
				}
			}
		]
	};

	const webpackConfig = {
	  entry: "./main.js",
	  output: {
	    filename: "bundle.js"
	  },
	  module: {
	    rules: [defaultCssRule]
	  }
	};

  fs = setup(webpackConfig, jsdomHtml);

  // Create a tiny file system. rootDir is used because loaders are refering to absolute paths.
  fs.mkdirpSync(rootDir);
  fs.writeFileSync(rootDir + "main.js", `var css = require('./${styleHref}'); var secondCss = require('./${secondStyleHref}');`);
  fs.writeFileSync(rootDir + styleHref, requiredCss);
  fs.writeFileSync(rootDir + secondStyleHref, requiredCss);

  it("Find and update style link href", done => {
  	runCompilerTest(hrefList, done);
  });
});
