import merge from 'lodash/merge';
import defaults from './defaults';
import source from './source';
const loadPath = `${process.env.NODE_ENV || 'dev'}`+'.js';
let envConfig = require('./'+loadPath);

module.exports = merge({},defaults,envConfig, source);
