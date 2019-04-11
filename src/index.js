import { port, env } from './config/vars';
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () =>
  console.info(`server started on port ${port} (${env})`)); // eslint-disable-line no-console

/**
* Exports express
* @public
*/
module.exports = app;
