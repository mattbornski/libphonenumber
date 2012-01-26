COMPILED = false;

var goog = require('closure').Closure({CLOSURE_BASE_PATH: 'closure/goog/'});

goog.require('goog.array');
goog.require('goog.proto2.PbLiteSerializer');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');

goog.loadScript('closure/goog/i18n/phonenumbers/phonemetadata.pb.js');
goog.loadScript('closure/goog/i18n/phonenumbers/phonenumber.pb.js');
goog.loadScript('closure/goog/i18n/phonenumbers/metadata.js');
goog.loadScript('closure/goog/i18n/phonenumbers/phonenumberutil.js');

var phoneUtil = goog.global.i18n.phonenumbers.PhoneNumberUtil.getInstance();
var PNF = goog.global.i18n.phonenumbers.PhoneNumberFormat;

var express = require('express');
var app = express.createServer(express.logger());

app.get('/', function(req, response) {
  var number = req.param('number');
  var country_code = req.param('country_code');

  var number = phoneUtil.parseAndKeepRawInput(number, country_code);
  var inumber = phoneUtil.format(number, PNF.E164)
  
  response.send(inumber);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
