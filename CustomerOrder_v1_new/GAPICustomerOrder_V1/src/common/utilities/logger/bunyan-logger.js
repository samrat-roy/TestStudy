"use strict";

import bunyan from 'bunyan';
import bformat from 'bunyan-format';
import config from '../../../config'

//let formatMode = config.loggerFormatMode;
let logMode = config.loggerLogMode;
let formatOut = bformat({
    outputMode: 'short'
});
let stream;
if(logMode == "rotating-file")
  {
    stream = [
      {
        type: 'rotating-file',
        name: 'debuglogs',
        level: 'error',
        path: 'logs/error.log',
        period: '1d', // daily rotation
        count: 3 // log ERROR and above to a file
      },
      {
        type: 'rotating-file',
        name: 'debuglogs',
        level: 'warn',
        path: 'logs/trace.log',
        period: '1d', // daily rotation
        count: 3 // log ERROR and above to a file
      }
    ]
  }
  else
  {
    stream = [
      {
       level: 'info',
       stream: formatOut
     }
     ]
  }

let logger = bunyan.createLogger({
    name: 'Tesco Analytics Data Ingestion API',
    serializers: {err: bunyan.stdSerializers.err},
    streams: stream

});

export default logger
