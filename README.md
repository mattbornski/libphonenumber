# google-libphonenumber

A lightweight wrapper for Google's `libphonenumber`, a library used by the Android Framework since version 4.0 to parse, format, store and validate international phone numbers. Based on [mattbornski's fork](https://github.com/mattbornski/libphonenumber).

## Status

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

## Installation

```
$ npm install --save google-libphonenumber
```

## Usage

```js
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').phoneUtil;
var phoneNumber = phoneUtil.parse('202-456-1414', 'US');
var result = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);

console.log('Result is', result);

// Result is +1 202-456-1414
```

## Dependencies

### Updating libphonenumber

1. Fetch the newest revision from `libphonenumber`'s repository (currently `r679`) without any svn metadata:

```
$ svn export http://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers lib/closure/goog/i18n/phonenumbers --force
```

2. (Optional) Update the library dependencies (unlikely to change in the foreseable future):

```
$ chmod +x node_modules/seegno-closure-library/closure/bin/build/depswriter.py
$ node_modules/seegno-closure-library/closure/bin/build/depswriter.py --root_with_prefix="./lib/closure/goog ../../../../lib/closure/goog" > ./lib/closure/goog/deps.js
```

### Updating closure-library

This project uses a fork of `closure-library` that has been published to npm. The package is maintained by [Seegno](https://github.com/seegno/closure-library) and receives regular updates.

If you absolutely need to update to the latest `closure-library` version you may have to fork the `seegno-closure-library` and follow the README's instructions on how to rebase with the upstream repository. This is unlikely to happen because `libphonenumber` uses a very small and stable set of closure dependences (only `string`, `array`, `proto2`).

Push the changes to your fork and add the following lines to your project's `package.json` :

```json
  "dependencies": {
    "seegno-closure-library": "git://github.com/<username>/closure-library#<commit-sha1,branch,tag>"
  }
```

Run `npm install` and after a successfull install, this library should pick that version instead.

Alternatively, you may publish your own version of `closure-library` to npm and use it that one instead.

## Notes

### Differencies from other forks

* Vendored the `google-closure` module to facilitate version tracking and control.
* Built-in integration with `google-closure`'s own node.js wrapper.
* Uses `google-closure`'s dependency management system to manange `libphonenumber` dependencies.
* More up-to-date `libphonenumber` revisions by simplying the update process.
* Exposes all available classes from `libphonenumber`.
* Does not expose additional functions.


### Errors

The javascript port of `libphonenumber` throws errors as string, e.g. `throw "Invalid country code"`. As Guillermo Rauch puts it, [a string is not an error](http://www.devthought.com/2011/12/22/a-string-is-not-an-error/) so, in an attempt to avoid future issues when developing an application, this module converts all string-based errors that occur on the `PhoneNumberUtil` class to instances of `Error`.

## Tests

A small subset of tests guarantees that the main library functions are working as expected and are correctly exposed. The actual heavy lifting is done by `libphonenumber`'s extensive test suite.

```
$ npm test
```

## Author

[Rui Marinho](https://github.com/ruimarinho)

## Credits

The original library wrapper was created by [Socialcam](https://github.com/Socialcam/node-libphonenumber) who first got it working on node.js and which was then improved by [mattbornski](https://github.com/mattbornski/libphonenumber). This package would not exist without the work of these previous contributions.

The exceptional work on `libphonenumber` was made possible by these [committers and contributors](https://code.google.com/p/libphonenumber/people/list).

## License

MIT

[npm-image]: https://img.shields.io/npm/v/google-libphonenumber.svg?style=flat
[npm-url]: https://npmjs.org/package/google-libphonenumber
[travis-image]: https://img.shields.io/travis/seegno/google-libphonenumber.svg?style=flat
[travis-url]: https://travis-ci.org/seegno/google-libphonenumber
