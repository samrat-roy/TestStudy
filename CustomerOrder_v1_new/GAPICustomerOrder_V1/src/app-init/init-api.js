import logger from '../resolver/logger';
import routes from '../routes';

function setRoutes(app) {
	app.use('/order/v1', routes);
	app.get('/', function (req, res) {
		res.send({ 'Message': 'Welcome to CustomerOrder backend api.' });
	});

	app.use(function (err, req, res, next) {
		if (err.Message) {
			res.status(400);
		} else {
			res.status(500);
		}
		res.json({ 'error': err });
		res.end();
		logger.logError(err);
		next();
	});
}

export default setRoutes;