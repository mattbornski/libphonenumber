var path = require('path');

COMPILED = false;
var closureBasePath = path.join(__dirname, '/closure-library/closure/goog/');
var libphonenumberBasePath = path.join(__dirname, '/libphonenumber/javascript/');
var goog = require('closure').Closure({CLOSURE_BASE_PATH: closureBasePath});

goog.require('goog.array');
goog.require('goog.proto2.PbLiteSerializer');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');
goog.require('goog.json');

goog.loadScript(libphonenumberBasePath + 'i18n/phonenumbers/phonemetadata.pb.js');
goog.loadScript(libphonenumberBasePath + 'i18n/phonenumbers/phonenumber.pb.js');
goog.loadScript(libphonenumberBasePath + 'i18n/phonenumbers/metadata.js');
goog.loadScript(libphonenumberBasePath + 'i18n/phonenumbers/phonenumberutil.js');

var phonenumbers = goog.global.i18n.phonenumbers;
var phoneUtil = phonenumbers.PhoneNumberUtil.getInstance();
var PhoneNumber = phonenumbers.PhoneNumber;
var PhoneNumberFormat = phonenumbers.PhoneNumberFormat;
var ValidationResult = phonenumbers.PhoneNumberUtil.ValidationResult;
var ValidationErrors = phonenumbers.Error;
var PNT = phonenumbers.PhoneNumberType;

var validateNumber = function (number, countryCode) {
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
            result = potentialPhoneNumber
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

  if (error) {
    throw error;
  } else {
    return result;
  }
};

var isTypeMobile = function (number) {
  return phoneUtil.getNumberType(number) === PNT.MOBILE;
};

var formatNumber = function (number, countryCode, numberFormat, callback) {
  var error = null;
  var result = null;

  try {
    var validNumber = validateNumber(number, countryCode);
    result = phoneUtil.format(validNumber, numberFormat);
  }
  catch (e) {
    error = e
  }

  if (callback) {
    callback(error, result);
  } else if (error) {
    throw error;
  } else {
    return result;
  }
};

var validate = function (number, countryCode, callback) {
  var error = null;
  var result = null;

  try {
    var validNumber = validateNumber(number, countryCode);
    result = validNumber instanceof PhoneNumber
  }
  catch (e) {
    error = e
  }

  if (callback) {
    callback(error, result);
  } else if (error) {
    throw error;
  } else {
    return result;
  }
};

var validateMobile = function (number, countryCode, callback) {
  var error = null;
  var result = null;

  try {
    var validNumber = validateNumber(number, countryCode);
    result = isTypeMobile(validNumber);
  }
  catch (e) {
    error = e
  }

  if (callback) {
    callback(error, result);
  } else if (error) {
    throw error;
  } else {
    return result;
  }
};

var validateMobileAndFormat = function (number, countryCode, callback) {
  var error = null;
  var result = null;

  try {
    var validNumber = validateNumber(number, countryCode);
    if (isTypeMobile(validNumber)) {
      result = phoneUtil.format(validNumber, PhoneNumberFormat.E164);
    } else {
      result = false;
    }
  }
  catch (e) {
    result = false;
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

var intl = function (number, countryCode, callback) {
  return formatNumber(number, countryCode, PhoneNumberFormat.INTERNATIONAL, callback);
};

module.exports = {
  'validate': validate,
  'validateMobile': validateMobile,
  'validateMobileAndFormat': validateMobileAndFormat,
  'e164': e164,
  'intl': intl,
  'phoneUtil': phoneUtil
};
