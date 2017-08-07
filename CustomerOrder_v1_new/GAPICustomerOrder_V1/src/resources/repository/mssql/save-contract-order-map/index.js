import config from '../../../../config';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'LegacySecureDBPool';
const spSaveContractOrderMapper = '[contract].[ContractOrderMapSave3]';

function saveContractOrderMapping(contractId, orderId, storeId, orderStatusId, martiniAddressId, dxshAddressId, orderAmendExpiryTime, isNasaEnabled, customerId){
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('ContractID', sql.Int, contractId);
			request.input('VirtStoreID', sql.Int, config.api.virtualStoreId);
			request.input('OrderID', sql.Int, orderId);
			request.input('StoreID', sql.Int, storeId);
			request.input('OrderStatusID', sql.Int, orderStatusId);
			request.input('MartiniDeliveryAddressID', sql.Int, martiniAddressId);
			request.input('DXSHDeliveryAddressID', sql.Int, dxshAddressId);
			request.input('OrderAmendExpiryTime', sql.VarChar, orderAmendExpiryTime);
			request.input('IsNASAEnabled', sql.Bit, isNasaEnabled);
			request.input('martiniCustomerNumber', sql.BigInt, customerId);			
			request.execute(spSaveContractOrderMapper).then(() => {
				resolve();
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

export default saveContractOrderMapping;
