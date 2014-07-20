
/**
 * Module dependencies
 */

require('obvious-closure-library/closure/goog/bootstrap/nodejs');
require('./closure/goog/deps');

goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');
goog.require('i18n.phonenumbers.Error');

var phoneUtil = goog.global.i18n.phonenumbers.PhoneNumberUtil.getInstance();
var PhoneNumberFormat = goog.global.i18n.phonenumbers.PhoneNumberFormat;
var ValidationResult = goog.global.i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
var ValidationErrors = goog.global.i18n.phonenumbers.Error;

var formatNumber = function (number, countryCode, numberFormat, callback) {
  var error = null;
  var result = null;

  // Strip out everything that's not a phone number.
  if (number) {
    var potentialPhoneNumber = number.toString();
    potentialPhoneNumber = potentialPhoneNumber.replace(/[^\+0-9]/, '');
    // E164 format numbers start with a plus sign.  If you have a plus sign
    // anywhere else, this is not a phone number.  If you don't have a plus
    // sign yet, don't worry, we'll give you one.
    if (potentialPhoneNumber.lastIndexOf('+') <= 0) {
      try {
        potentialPhoneNumber = phoneUtil.parse(potentialPhoneNumber, countryCode);
        var quickReason = phoneUtil.isPossibleNumberWithReason(potentialPhoneNumber);
        if (quickReason !== ValidationResult.IS_POSSIBLE) {
          for (var code in ValidationResult) {
            if (ValidationResult[code] === quickReason) {
              error = new Error(ValidationErrors[code]);
            }
          }
          if (error === null) {
            error = new Error('Invalid number (unspecified reason)');
          }
        } else {
          if (phoneUtil.isValidNumber(potentialPhoneNumber)) {
            result = phoneUtil.format(potentialPhoneNumber, numberFormat);
          } else {
            error = new Error('Invalid number');
          }
        }
      } catch (e) {
        error = e;
      }
    } else {
      error = new Error('Not a phone number');
    }
  } else {
    error = new Error('No number given');
  }
  if (callback) {
    callback(error, result);
  } else if (error) {
    throw error;
  } else {
    return result;
  }
};

var e164 = function (number, countryCode, callback) {
  return formatNumber(number, countryCode, PhoneNumberFormat.E164, callback);
};

var intl = function(number, countryCode, callback) {
  return formatNumber(number, countryCode, PhoneNumberFormat.INTERNATIONAL, callback);
};

module.exports = {
  e164: e164,
  intl: intl,
  phoneUtil: phoneUtil
};
