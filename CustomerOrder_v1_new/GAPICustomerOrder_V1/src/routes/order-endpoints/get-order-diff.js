import common from '../common';
import business from '../../resolver/business';

export default function getOrderDiff(req, res, next) {
	let callContext = {};
	common.request.validate(req)
		.then(() => {
			callContext = common.context.create(req, callContext);
			business.getOrderDiff(req.params.orderId, callContext)
				.then(result => res.send(result))
				.catch(err => next(err));
		})
		.catch(err => next(err));
}
