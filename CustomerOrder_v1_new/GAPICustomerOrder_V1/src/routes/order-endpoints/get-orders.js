import common from '../common';
import business from '../../resolver/business';

export default function getOrders(req, res, next) {
	let callContext = {};
	common.request.validate(req)
		.then(() => {
			callContext = common.context.create(req, callContext);
			business.getOrders(callContext)
				.then(result => res.send(result))
				.catch(err => {
					next(err);
				});
		}).catch(err => {
			next(err);
		});
}
