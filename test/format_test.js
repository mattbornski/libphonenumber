
/**
 * Test dependencies
 */

var PNF = require('..').PhoneNumberFormat;
var phoneUtil = require('..').phoneUtil;
var should = require('should');

describe('Formatting', function () {
  var validNumbers = [
    '202-456-1414',
    '(202) 456-1414',
    '+1 (202) 456-1414',
    '202.456.1414',
    '202/4561414',
    '1 202 456 1414',
    '+12024561414',
    '1 202-456-1414',
  ];

  describe('International Format', function () {
    it('should properly standardize a US number in various PNF', function () {
      validNumbers.forEach(function(value) {
        var phoneNumber = phoneUtil.parse(value, 'US');

        phoneUtil.format(phoneNumber, PNF.INTERNATIONAL).should.equal('+1 202-456-1414');
      });
    });
  });

  describe('E164 Format', function () {
    it('should properly standardize a US number in various PNF', function () {
      validNumbers.forEach(function(value) {
        var phoneNumber = phoneUtil.parse(value, 'US');

        phoneUtil.format(phoneNumber, PNF.E164).should.equal('+12024561414');
      });
    });
  });

  describe('National Format', function () {
    it('should properly standardize a US number in various PNF', function () {
      validNumbers.forEach(function(value) {
        var phoneNumber = phoneUtil.parse(value, 'US');

        phoneUtil.format(phoneNumber, PNF.NATIONAL).should.equal('(202) 456-1414');
      });
    });
  });

  describe('RFC3966 Format', function () {
    it('should properly standardize a US number in various PNF', function () {
      validNumbers.forEach(function(value) {
        var phoneNumber = phoneUtil.parse(value, 'US');

        phoneUtil.format(phoneNumber, PNF.RFC3966).should.equal('tel:+1-202-456-1414');
      });
    });
  });

  describe('Unparsable Numbers', function() {
    var calls = 0;

    var invalidNumbers = [
      ['1', null],
      ['2', 'CN'],
      ['3', 'IT'],
      ['408-555-1212', null],
    ];

    invalidNumbers.forEach(function(pair) {
      var phoneNumber;

      try {
        phoneNumber = phoneUtil.parse(pair[0], pair[1]);
      } catch (e) {
        calls++;
      }
    });

    invalidNumbers.length.should.equal(calls);
  });
});
