import config from '../../../../config';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'LegacySecureDBPool';
const spGetContractId = '[contract].[OrderContractMapGet]';

function getContractIdForOrderId(orderId, storeId, context) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('OrderID', sql.Int, orderId);
			request.input('StoreID', sql.Int, storeId);
			request.input('martiniCustomerNumber', sql.BigInt, context.customerId);
			request.input('VirtualStoreID', sql.Int, config.api.virtualStoreId);
			request.output('ContractID', sql.Int, 0);
			request.output('MartiniDeliveryAddressID', sql.Int, 0);
			request.execute(spGetContractId)
                .then(spResult => resolve(spResult.output.ContractID))
                .catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

export default getContractIdForOrderId;


