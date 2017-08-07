import business from '../../resolver/business';
import common from '../common';

export default function cancelOrder(req, res, next) {
	let callContext = {};
	common.request.validate(req).then(() => {
		callContext = common.context.create(req, callContext);
		business.cancelOrder(req.body, callContext)
			.then(result => res.send(result))
			.catch(err => next(err));
	}).catch(err => next(err));
}
