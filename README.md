# Libphonenumber by google over NodeJs

Simple NodeJs app providing an http endpoint to retrieve a phone number with its international prefix.

Enjoy :)

## Simple example on Heroku

First, deploy the app to an heroku instance, then just query it:

    http://yourapp.herokuapp.com/?number=415-603-4232&country_code=US
    => {"e164":"+14156034232","national":"(415) 603-4232","valid":true,"type":"FIXED_LINE_OR_MOBILE"}


Socialcam - http://socialcam.com