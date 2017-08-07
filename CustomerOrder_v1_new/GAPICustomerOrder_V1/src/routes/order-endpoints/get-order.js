import common from '../common';
import business from '../../resolver/business';

const DEFAULTORDERIDENTIFIER = 0;

export default function getOrder(req, res, next) {
	let callContext = {};
	common.request.validate(req)
		.then(() => {
			callContext = common.context.create(req, callContext);
			let orderIdentifier = req.params && req.params.orderIdentifier ? req.params.orderIdentifier : DEFAULTORDERIDENTIFIER;
			business.getOrder(orderIdentifier, callContext)
				.then(result => res.send(result))
				.catch(err => next(err));
		})
		.catch(err => next(err));
}