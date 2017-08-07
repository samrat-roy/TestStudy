import basketOrderMapper from '../common/mapper/basket-order-mapping';
import helper from '../common/helper';
import parser from 'xml2js';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'BasketDBPool';
const spGetBaskets = '[basket].[BasketGetByCustomerGAPI]';

function getMartiniBaskets(context) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('customerid', sql.BigInt, context.customerId);
			request.execute(spGetBaskets).then(spResult => {
				if (spResult.recordset[0]['']) {
					parser.parseString(spResult.recordset[0][''], {
						valueProcessors: [helper.parseNumbers],
						attrValueProcessors: [helper.parseNumbers]
					}, function (err, parsedResult) {
						if (err) reject(err);
						else {
							if (parsedResult.BasketDetails && parsedResult.BasketDetails.BasketEntity && parsedResult.BasketDetails.BasketEntity.length > 0) {
								let orders = getOrdersFromBaskets(parsedResult.BasketDetails.BasketEntity);
								orders.some(order => order != null) ? resolve(orders) : reject(new Error('BasketCorrupt for the user ' + context.customerId));
							} else resolve(null);
						}
					});
				}
				else resolve(null);
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

function getOrdersFromBaskets(baskets) {
	let orders = [];
	for (let count = 0, len = baskets.length; count < len; count++) {
		orders.push(basketOrderMapper(baskets[count]));
	}
	return orders;
}

export default getMartiniBaskets;

