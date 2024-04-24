# keytween <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Encode and decode a string using the "look between X and Y on your keyboard" meme format

## Usage

```sh
npx keytween # if not installed

keytween # if installed and in the PATH
```

```sh
$ keytween --help
Usage: keytween [--layout=<layout>] [--concise] [--decode] <input>

Options:
  --layout=<layout>  The keyboard layout to use (default: english)
  --concise          print output as a single line, instead of a tweetable meme format
  --decode           Decode the input (only accepts concise form)
  <input>            The input to encode/decode. Multiple words accepted as positional arguments

$ keytween jk
look between H and L on your keyboard

$ keytween jk -c
hl

$ keytween --decode hl
jk
```

## Install

```
npm install --save-dev keytween
```

## License

MIT

[package-url]: https://npmjs.org/package/keytween
[npm-version-svg]: https://versionbadg.es/ljharb/keytween.svg
[deps-svg]: https://david-dm.org/ljharb/keytween.svg
[deps-url]: https://david-dm.org/ljharb/keytween
[dev-deps-svg]: https://david-dm.org/ljharb/keytween/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/keytween#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/keytween.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/keytween.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/keytween.svg
[downloads-url]: https://npm-stat.com/charts.html?package=keytween
[codecov-image]: https://codecov.io/gh/ljharb/keytween/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/keytween/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/keytween
[actions-url]: https://github.com/ljharb/keytween/actions
