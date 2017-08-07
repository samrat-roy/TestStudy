import contractsOrderMapper from './mapper';
import helper from '../common/helper';
import parser from 'xml2js';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'GroceryContractDBPool';
const spGetContracts = 'groceryContract.GroceryContractHistoryGet';

function getOrderDiff(contractId, context) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('GroceryContractID', sql.BigInt, contractId);
			request.input('CustomerNumber', sql.BigInt, context.customerId);
			request.input('NumberOfVersions', sql.SmallInt, 2);
			request.execute(spGetContracts).then(result => {
				parser.parseString(result.recordset[0][''],
					{
						valueProcessors: [helper.parseNumbers],
						attrValueProcessors: [helper.parseNumbers]
					},
					function (err, parsedResults) {
						if (err) reject(err);
						else { resolve(contractsOrderMapper(parsedResults.ArrayOfContractEntity.ContractEntity)); }
					}).catch(err => reject(err));
			}).catch(err => reject(err));
		});
	});
}

export default getOrderDiff;