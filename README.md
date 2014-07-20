# libphonenumber [![Build Status](https://travis-ci.org/mattbornski/libphonenumber.png)](http://travis-ci.org/mattbornski/libphonenumber) [![Build status](https://ci-beta.appveyor.com/api/projects/status/rmhkeri71ystuk7w)](https://ci-beta.appveyor.com/project/mattbornski/libphonenumber)

node.js port of google's libphonenumber (thanks to SocialCam), packaged for npm.

## Usage

### Installation

```
npm install libphonenumber
```

### Example

```javascript
var libphonenumber = require('libphonenumber')

//

```

## Updating libphonenumber

1. Run `svn export http://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers lib/closure/goog/i18n/phonenumbers --force`

This will export the most recent version of libphonenumber (svn trunk) without any svn metadata (.svn).

Optional steps in case dependencies need to be updated (unlikely):

1. `chmod +x node_modules/obvious-closure-library/closure/bin/build/depswriter.py`
2. `node_modules/obvious-closure-library/closure/bin/build/depswriter.py --root_with_prefix="./lib/closure/goog ../../../../lib/closure/goog" > ./lib/closure/goog/deps.js`

## Updating closure-library

This project uses a fork of `closure-library` that is published to npm. It is maintained by the team at Medium and receives regular updates. It includes a custom post install script that removes unnecessary data and test files to keep things tidy.
If you absolutely need to update to the latest `closure-library` version you may fork the `obvious-closure-library` and follow their instructions on how to rebase with the upstream repository.
Push your changes and on your project's `package.json` add the following lines:

```json
  "dependencies": {
    "obvious-closure-library": "git://github.com/<organization>/closure-library#<commit-sha1>"
  }
```

Run `npm install` and after a successfull install, this library should use that version instead.
