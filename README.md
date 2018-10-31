[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <img width="200" height="200" src="https://cdn.worldvectorlogo.com/logos/javascript.svg">
  <a href="https://webpack.js.org/">
    <img width="200" height="200" vspace="" hspace="25" src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon-square-big.svg">
  </a>
  <h1>restyle-loader</h1>
</div>

<div align="center">

Updates style `<link>` href value with a hash to trigger a style reload

Loader new home: [restyle-loader](https://github.com/danielverejan/restyle-loader)

</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev restyle-loader
```

<h2 align="center">Usage</h2>

[Documentation: Using loaders](https://webpack.js.org/loaders/)

<h2 align="center">Examples</h2>

**webpack.config.js**

```js
{
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
}
```
Hash is required to enable HMR

**bundle.js**

```js
require("./index.css");

// Bundle code here...
```


**index.html**

```html
<!-- ... -->
<head>
  <link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<!-- ... -->
```
after the loader runs it becomes
```html
<!-- ... -->
<head>
  <link rel="stylesheet" type="text/css" href="css/index.css?531fdfd0">
</head>
<!-- ... -->
```


<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars2.githubusercontent.com/u/7072732?v=3&s=150">
          <br />
          <a href="https://github.com/">Daniel Verejan</a>
        </a>
      </td>
      <!-- <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars0.githubusercontent.com/u/166921?v=3&s=150">
          <br />
          <a href="https://github.com/">Juho Vepsäläinen</a>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars0.githubusercontent.com/u/8420490?v=3&s=150">
          <br />
          <a href="https://github.com/">Joshua Wiens</a>
        </a>
      </td> -->
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/restyle-loader.svg
[npm-url]: https://npmjs.com/package/restyle-loader

[deps]: https://david-dm.org/webpack-contrib/restyle-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/restyle-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/restyle-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/restyle-loader

[cover]: https://codecov.io/gh/webpack-contrib/restyle-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/restyle-loader
