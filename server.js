var express = require("express")
var bodyParser = require('body-parser');
var path = require("path");
var winston = require( 'winston' );
var fs = require('fs');
var cors = require('cors');
require('winston-daily-rotate-file');

config = {
    SERVER_PORT : 9000
}

//Initialize server instance
var Server = new express();
//Set loggineg files
var infoFilename =  path.join(__dirname,'..','logs','all', 'logfile.log');
var errorFilename = path.join(__dirname,'..','logs', 'errors', 'errorfile.log');

Server.use(cors({origin : '*'}));
Server.use(bodyParser.urlencoded({ extended: true }));

//Log server settings
var transportInfo = new (winston.transports.DailyRotateFile)
({
  name:"infofile",
  filename: infoFilename,
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level:'info',
});

//Filter error messages from log
var transportError = new (winston.transports.DailyRotateFile)({
  name:"errorfile",
  filename: errorFilename,
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: 'error'
});

var logger = winston.createLogger({
  transports: [
    transportInfo, transportError
  ]
});

//first log
logger.info('Log Server started');
logger.error('Log Server started');


// logger api
Server.post ('/api/logger', function( req, res, next ) {
  logger.log( req.body.level.toLowerCase() || 'error',
    'Client: ' + req.body.message);
  return res.send( 'OK' );
});
//End of logger

/**
.....
*/

Server.listen(config.SERVER_PORT, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==>   Listening on", config.SERVER_PORT, config.SERVER_PORT)
  }
})