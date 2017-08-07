require('babel-polyfill');
require('babel-register');

import app from './app-init';

app.listen(app.get('port'),function(){
	console.log(`${app.get('name')}:${app.get('version')}  API - started.`);
});
