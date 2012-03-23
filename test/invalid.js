/* Mocha test
   to use:
     npm install mocha
     mocha <filename>
   or
     npm test
*/

var assert = require('assert');
var libphonenumber = require('../lib/index');

describe('Invalid phonenumbers', function () {
  it('should be rejected', function (done) {
    var formats = [
      ['1', null],
      ['2', 'CN'],
      ['3', 'IT'],
      ['123', 'DE'],
      ['456', 'US'],
      ['408-555-1212', null],
      ['+++12345---56789', null],
    ];
    var count = 0;
    var results = {};
    for (var index in formats) {
      libphonenumber.e164(formats[index][0], formats[index][1], function (error, result) {
        if (result) {
          return done(new Error(result));
        }
        count += 1;
        if (count === formats.length) {
          return done();
        }
      });
    }
  });
});