
module.exports = () => {
	return {	
		customer: require('./personal-details'),
		getAddress: require('./address'),
		getBasketOrder: require('./basket-order'),
		getContractOrder: require('./contract-order'),
		getOrdersFromContractHeaders : require('./contract-orders'),
		getLocation: require('./location'),
		getOrderVersions : require('./order-versions'),
		ordersummary: require('./order-summary.json')
	};
};