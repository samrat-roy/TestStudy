import config from '../../../../config';
import logger from '../../../../resolver/logger';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'LegacySecureDBPool';
const spRemoveUnusedSmartCoupons = 'payment.PaymentOrderUsedSmartCouponDeleteGAPI';

function removeUnusedSmartCoupons(couponIds, OrderId, storeId) {
	pool.getPool(poolName).then(connectionPool => {
		let request = new sql.Request(connectionPool);
		request.input('CouponIDs', sql.VarChar, couponIds.join());
		request.input('OrderNo', sql.Int, OrderId);
		request.input('BranchId', sql.Numeric(5,0), storeId);
		request.input('VirtualStoreID', sql.SmallInt, config.api.virtualStoreId);
		request.execute(spRemoveUnusedSmartCoupons)
			.catch(err => {
				logger.logError(err);
			});
	}).catch(err => {
		logger.logError(err);
	});
}

export default removeUnusedSmartCoupons;
