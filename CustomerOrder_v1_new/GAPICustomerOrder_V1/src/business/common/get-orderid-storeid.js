import errorCodes from '../../common/error-codes';
const businessErrorCodes = errorCodes.BusinessErrorCodes;

function getOrderIdStoreId(orderIdentifier){

	if (!orderIdentifier) {
		throw new Error(businessErrorCodes.invalidOrderIdentifier.err_message);
	}

	if (!orderIdentifier.includes('_') || orderIdentifier.split('_').length != 2) {
		throw new Error(businessErrorCodes.invalidOrderIdentifier.err_message);
	}

	let orderIdStoreId = orderIdentifier.split('_');
	let orderId = orderIdStoreId[0];

	if (!orderId || isNaN(orderId)) {
		throw new Error(businessErrorCodes.invalidOrderId.err_message);
	}

	let storeId = orderIdStoreId[1];
	if (!storeId || isNaN(storeId)) {
		throw new Error(businessErrorCodes.invalidStoreId.err_message);
	}

	return {
		'OrderId' : orderId,
		'StoreId' : storeId
	};
}

export default getOrderIdStoreId;