import errorCodes from '../common/error-codes';
import getOrderIdStoreId from './common/get-orderid-storeid';
import repository from '../resolver/repository';
const businessErrorCodes = errorCodes.BusinessErrorCodes;

export default async function getOrderDiff(orderIdentifier, context) {
	let orderIdStoreId = getOrderIdStoreId(orderIdentifier);
	let orderNo = orderIdStoreId.OrderId;
	let storeId = orderIdStoreId.StoreId;
	let contractId = await repository.getContractId(orderNo, storeId, context);

	if (contractId > 0) {
		return await repository.getOrderDiffdetails(contractId, context);
	}

	return Promise.reject(new Error(businessErrorCodes.invalidOrderIdentifier.err_message));
}