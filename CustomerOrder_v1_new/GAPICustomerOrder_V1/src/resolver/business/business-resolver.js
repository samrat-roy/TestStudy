import customerOrderBusiness from '../../business';

exports.cancelOrder = (orderIdentifier, isOrderMigrated,  order, context) => {
	return customerOrderBusiness.cancelOrder(orderIdentifier, isOrderMigrated,  order, context);
};

exports.getOrder = (orderIdentifier, context) => {
	return customerOrderBusiness.getOrder(orderIdentifier, context);
};

exports.getOrders = (context) => {
	return customerOrderBusiness.getOrders(context);
};

exports.getOrderDiff = (orderId,context)=> {
	return customerOrderBusiness.getOrderDiff(orderId,context);
};