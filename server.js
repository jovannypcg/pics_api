'use strict';

/**
 * Server Dependencies
 */
let mongoose = require('./api/config/system/mongoose');
let restify = require('./api/config/system/restify');

// Mongoose and Server Initialization
mongoose.init( startServer => restify.init() );
