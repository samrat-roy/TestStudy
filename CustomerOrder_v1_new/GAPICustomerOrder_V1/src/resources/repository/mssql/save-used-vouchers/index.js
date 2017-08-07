import config from '../../../../config';
import logger from '../../../../resolver/logger';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'LegacySecureDBPool';
const spSaveUsedVouchers = '[dbo].[Payment_AddToOrderUsed]';

function saveUsedVouchers(context, orderId, storeId, paymentSubTypeId, expiryDate, stan, paymentStatusID, ean, value, voucherId, reservedDate, existingPaymentId) {
	pool.getPool(poolName).then(connectionPool => {
		let request = new sql.Request(connectionPool);
		request.input('OrderNo', sql.Int, orderId);
		request.input('VirtStoreID', sql.SmallInt, config.api.virtualStoreId);
		request.input('StoreID', sql.Numeric, storeId);
		request.input('PaymentSubTypeID', sql.TinyInt, paymentSubTypeId);
		request.input('ExpiryDate', sql.VarChar, expiryDate);
		request.input('STAN', sql.Int, stan);
		request.input('PaymentStatusID', sql.TinyInt, paymentStatusID);
		request.input('EAN', sql.VarChar, ean);
		request.input('Value', sql.Money, value);
		request.input('SmartVoucherID', sql.VarChar, voucherId);
		request.input('ReservedDate', sql.VarChar, reservedDate);
		request.input('ExistingPaymentID', sql.Int, existingPaymentId);
		request.execute(spSaveUsedVouchers)
			.catch(err => {
				logger.logError(new Error('Error in executing SP - [dbo].[Payment_AddToOrderUsed] for userId '+ context.customerId + '.' + err));
			});
	}).catch(err => {
		logger.logError(err);
	});
}

export default saveUsedVouchers;
