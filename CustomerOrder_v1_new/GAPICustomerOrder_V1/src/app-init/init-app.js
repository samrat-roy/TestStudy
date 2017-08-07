import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';

function initApp(config){
	let app = express();
	app.set('env',config.environment);
	app.set('json space',4);
	app.set('name',config.api.name);
	app.set('version',config.api.version);
	app.set('port',process.env.PORT || config.applicationPort);
	app.set('config',config);
	app.set('case sensitive routing', false);
	app.disable('x-powered-by');
  
	app.use(bodyParser.json({limit:'100KB'}));
	app.use(cors());
	app.use(compression());
	app.use(function (err, req, res, next) {
		if(err)
    {
			res.status(500);
			res.render('error', { error: err });
			res.end();
		}
	});

	process.on('unhandledRejection', (reason, promise) => {
		console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
	});

	return app;
}

export default initApp;
