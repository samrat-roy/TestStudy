const BusinessErrorCodes = {
	'invalidOrderIdentifier': {
		'err_code': 'Invalid_Orderidentifier',
		'err_message': 'Invalid OrderId / StoreId'
	},
	'invalidOrderId': {
		'err_code': 'Invalid_OrderId',
		'err_message': 'Invalid OrderId'
	},
	'invalidStoreId': {
		'err_code': 'Invalid_StoreId',
		'err_message': 'Invalid StoreId'
	},
	'invalidOrderForCancellation': {
		'err_code': 'Invalid_Order',
		'err_message': 'Cannot cancel the order'
	},
	'nullOrders':{
		'err_code': 'Null_Orders',
		'err_message': 'No orders present'
	},
	'nullActiveOrder' :{
		'err_code': 'null_ActiveOrder',
		'err_message': 'There is no active order'
	}
};
export default BusinessErrorCodes;
