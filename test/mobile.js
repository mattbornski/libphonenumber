var assert = require('assert');
var libphonenumber = require('../lib/index');

describe.only('validateMobileAndFormat', function () {
  it('should be rejected', function () {
    var numbers = [
      '+374 94 000 2821',
      '+374 10 000 000',
      '+374 (10) 123 123'
    ];

    var count = 0;
    var failed = 0;
    numbers.forEach(function (number) {
      libphonenumber.validateMobileAndFormat(number, null, function (err, result) {
        if (result === false) {
          failed++;
        }

        count++;

        if (count === numbers.length) {
          assert.equal(count, failed);
        }
      });
    });
  });
  it('should be accepted', function () {
    var numbers = [
      '+374 94 000 282',
      '+37441568966',
      '+374(41)568966'
    ];

    var count = 0;
    var succeeded = 0;
    numbers.forEach(function (number) {
      libphonenumber.validateMobileAndFormat(number, null, function (err, result) {
        if (result) {
          succeeded++;
        }

        count++;

        if (count === numbers.length) {
          assert.equal(count, succeeded);
        }
      });
    });
  });
});