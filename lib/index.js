'use strict';

var _vars = require('./config/vars');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

var app = require('./config/express');
var mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(_vars.port, function () {
  return console.info('server started on port ' + _vars.port + ' (' + _vars.env + ')');
});

/**
* Exports express
* @public
*/
module.exports = app;