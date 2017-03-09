// Node v4 requires "use strict" to allow block scoped let & const
"use strict";

import MemoryFS from "memory-fs";
import realFs from "fs";
import webpack from "webpack";
import path from "path";
import jsdom from "jsdom";

// import assert from "assert";

var compiler;
var jsdomHtml;

export function setup(webpackConfig, _jsdomHtml) {
	let fs = new MemoryFS();

	jsdomHtml = _jsdomHtml;

	// Makes webpack resolve restyle-loader to local folder instead of node_modules
	Object.assign(webpackConfig, {
	  resolveLoader: {
	    alias: {
	      "restyle-loader": path.resolve(__dirname, "../")
	    }
	  }
	});

	compiler = webpack(webpackConfig);

	// Tell webpack to use our in-memory FS
	compiler.inputFileSystem = fs;
	compiler.outputFileSystem = fs;
	compiler.resolvers.normal.fileSystem = fs;
	compiler.resolvers.context.fileSystem = fs;

	["readFileSync", "statSync"].forEach(fn => {
	  // Preserve the reference to original function
	  fs["mem" + fn] = fs[fn];

	  compiler.inputFileSystem[fn] = function(_path) {
	    // Fallback to real FS if file is not in the memoryFS
	    if (fs.existsSync(_path)) {
	      return fs["mem" + fn].apply(fs, arguments);
	    } else {
	      return realFs[fn].apply(realFs, arguments);
	    }
	  };
	});

	return fs;
}

export function runCompilerTest(hrefList, done) {
  compiler.run((err, stats) => {
  	debugger;
    if (stats.compilation.errors.length) {
      throw new Error(stats.compilation.errors);
    }

    const bundleJs = stats.compilation.assets["bundle.js"].source();

    jsdom.env({
      html: jsdomHtml,
      src: [bundleJs],
      done: (err, window) => {
      	hrefList.forEach(src => {
      		const regExp = new RegExp(src + "\\?\\w{8}$");
      		const el = window.document.querySelector(`link[href*='${src}']`);

      		expect(el).not.toBe(null);
      		expect(el.href).toBeDefined();
      		expect(regExp.test(el.href)).toBe(true);
      	});

        // free memory associated with the window
        window.close();

        done();
      }
    });
  });
}
