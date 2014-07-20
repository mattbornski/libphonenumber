
/**
 * Test dependencies
 */

var libphonenumber = require('..');
var should = require('should');

describe('Exports', function () {
  it('should expose all provided modules', function() {
    Object.keys(libphonenumber).should.containDeep([
      'NumberFormat',
      'PhoneMetadata',
      'PhoneMetadataCollection',
      'PhoneNumberDesc',
      'PhoneNumber',
      'metadata',
      'Error',
      'PhoneNumberFormat',
      'PhoneNumberType',
      'PhoneNumberUtil'
      ]);
  });

  it('should expose an instance of `PhoneNumberUtil`', function() {
    libphonenumber.phoneUtil.should.be.instanceOf(libphonenumber.PhoneNumberUtil);
  });
});
