/* Mocha test
   to use:
     npm install mocha
     mocha <filename>
   or
     npm test
*/

var assert = require('assert');
var libphonenumber = require('../lib/index');

describe('Readme example', function () {
  it('should properly standardize a US number in various formats', function (done) {
    var formats = [
      '202-456-1414',
      '(202) 456-1414',
      '+1 (202) 456-1414',
      '202.456.1414',
      '202/4561414',
      '1 202 456 1414',
      '+12024561414',
    ];
    var count = 0;
    var results = {};
    for (var index in formats) {
      libphonenumber.e164(formats[index], 'US', function (error, result) {
        if (error) {
          return done(error);
        }
        count += 1;
        if (results[result] === undefined) {
          results[result] = 0;
        }
        results[result] += 1;
        if (count === formats.length) {
          if (results[result] === count) {
            return done();
          } else {
            var counts = [];
            for (var key in results) {
              counts.push(key + ': ' + results[key]);
            }
            return done(new Error(counts.join(', ')));
          }
        }
      });
    }
  });
});