import common from './context-defaults';
import config from '../../config';

exports.create = (req,context) =>
{
	context.customerId = req.headers['customer-id'] ? req.headers['customer-id'] : req.query.customerid;
	context.business = req.headers['business'] ? req.headers['business'] : req.query.business ? req.query.business : common.business;
	context.channel = req.headers['channel'] ? req.headers['channel'] : req.query.channel ? req.query.channel : common.channel;
	context.language = req.headers['language'] ? req.headers['language'] : req.query.language ? req.query.language : common.language;
	context.country = req.headers['country'] ? req.headers['country'] : req.query.country ? req.query.country : common.country;
	context.authToken = req.headers.authorization;
	context.anonymousToken = config.anonymousToken;
	return context;
};