require('babel/register');

var debug = require('debug');
debug.enable('client*');

require('./query');
require('./mutation');
