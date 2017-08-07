import contractHeaderOrderMapper from './mapper';
import helper from '../common/helper';
import parser from 'xml2js';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'GroceryContractDBPool';
const spGetContractHeaders = 'groceryContract.GroceryContractHeaderListGetGAPI';

function getContractHeaders(context, contractIds) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('ContractIDList', sql.VarChar, contractIds.join());
			request.input('CustomerNumber', sql.BigInt, context.customerId);
			request.execute(spGetContractHeaders).then(spResult => {
				let orders = [];
				contractIds.forEach(id => {					
					let contractDetails = spResult.recordset.find(record => {
						return record.GroceryContractID == id;
					});

					if (!contractDetails) {
						return reject(new Error('Contract Details missing for contractid - ' + id + '. User - ' + context.customerId));
					} else {
						parser.parseString(contractDetails.ContractHeaderXML, {
							valueProcessors: [helper.parseNumbers],
							attrValueProcessors: [helper.parseNumbers]
						}, function (err, parsedResult) {
							if (err) reject(err);
							else { orders.push(contractHeaderOrderMapper(parsedResult.ContractHeader)); }
						});
					}
				});
				return resolve(orders);
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

export default getContractHeaders;


