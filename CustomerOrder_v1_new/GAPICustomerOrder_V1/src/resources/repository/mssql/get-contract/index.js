import helper from '../common/helper';
import mapper from '../common/mapper/contract-order-mapper';
import parser from 'xml2js';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'GroceryContractDBPool';
const spGetContract = 'groceryContract.GroceryContractGet';

function getContractForContractId(contractId, context) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('GroceryContractID', sql.BigInt, contractId);
			request.input('CustomerNumber', sql.BigInt, context.customerId);
			request.execute(spGetContract).then(spResult => {
				parser.parseString(spResult.recordset[0]['ContractXML'], {
					valueProcessors: [helper.parseNumbers],
					attrValueProcessors: [helper.parseNumbers]
				}, function (err, parsedResult) {
					if (err) reject(err);
					else { resolve(mapper.mapContractToOrder(parsedResult)); }
				});
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

export default getContractForContractId;


