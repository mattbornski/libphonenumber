COMPILED = false;

var goog = require('closure').Closure({CLOSURE_BASE_PATH: 'closure/goog/'});

goog.require('goog.array');
goog.require('goog.proto2.PbLiteSerializer');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');
goog.require('goog.json');

goog.loadScript('closure/goog/i18n/phonenumbers/phonemetadata.pb.js');
goog.loadScript('closure/goog/i18n/phonenumbers/phonenumber.pb.js');
goog.loadScript('closure/goog/i18n/phonenumbers/metadata.js');
goog.loadScript('closure/goog/i18n/phonenumbers/phonenumberutil.js');

var phoneUtil = goog.global.i18n.phonenumbers.PhoneNumberUtil.getInstance();
var PNF = goog.global.i18n.phonenumbers.PhoneNumberFormat;
var PNT = goog.global.i18n.phonenumbers.PhoneNumberType;

var express = require('express');
var app = express.createServer(express.logger());

app.get('/', function(req, response) {
  var number = req.param('number');
  var country_code = req.param('country_code');

  var number = phoneUtil.parseAndKeepRawInput(number, country_code);
  var inumber = phoneUtil.format(number, PNF.E164);
  var national = phoneUtil.format(number, PNF.NATIONAL);
  
  var is_valid = phoneUtil.isValidNumber(number);
  var type = 'UNKNOWN';
  
  switch (phoneUtil.getNumberType(number)) {
    case PNT.FIXED_LINE:
      type = 'FIXED_LINE';
      break;
    case PNT.MOBILE:
      type ='MOBILE';
      break;
    case PNT.FIXED_LINE_OR_MOBILE:
      type ='FIXED_LINE_OR_MOBILE';
      break;
    case PNT.TOLL_FREE:
      type ='TOLL_FREE';
      break;
    case PNT.PREMIUM_RATE:
      type ='PREMIUM_RATE';
      break;
    case PNT.SHARED_COST:
      type ='SHARED_COST';
      break;
    case PNT.VOIP:
      type ='VOIP';
      break;
    case PNT.PERSONAL_NUMBER:
      type ='PERSONAL_NUMBER';
      break;
    case PNT.PAGER:
      type ='PAGER';
      break;
    case PNT.UAN:
      type ='UAN';
      break;
    case PNT.UNKNOWN:
      type ='UNKNOWN';
      break;
  }
  
  var j = goog.json.serialize({e164: inumber, national: national, valid: is_valid, type: type});
  response.send(j);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
