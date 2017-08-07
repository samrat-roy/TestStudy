import config from '../../../../config';
import mapper from './mapper.js';
import moment from 'moment';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'LegacySecureDBPool';
const spGetOrderSummary = '[contract].[OrderSummaryGetGAPI]';

function getOrderSummary(dxshCustomerId) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			let endDate = moment();
			let startDate = endDate.clone().subtract(config.api.maxorderage, 'days');
			request.input('DateFrom', sql.VarChar, startDate.format('YYYY-MM-DD HH:mm:ss'));
			request.input('DateTo', sql.VarChar, endDate.format('YYYY-MM-DD HH:mm:ss'));
			request.input('NumberOfRecordsPending', sql.Int, config.api.pendingorderscount);
			request.input('NumberOfRecordsPrevious', sql.Int, config.api.historyordercount);
			request.input('DeliverySlotExpiryBuffer', sql.SmallInt, config.api.deliveryslotexpirybuffer);
			request.input('Cust_id', sql.Int, dxshCustomerId);
			request.execute(spGetOrderSummary).then(spResult => {
				if (spResult.recordset.length > 0) {
					resolve(mapper.mapToOrderSummaries(spResult.recordset));
				} else resolve([]);
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

export default getOrderSummary;
