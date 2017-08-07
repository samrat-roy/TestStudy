import mapper from './mapper.js';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'BasketDBPool';
const spGetPostCodesCharges = '[basket].[[ChargesGetByPostcodesGAPI]]';

function getPostCodesBagCharges(postCodes) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('Postcodes', sql.VarChar, postCodes.join());
			request.execute(spGetPostCodesCharges).then(spResult => {
				return resolve(mapper.getPostCodeBagCharges(postCodes, spResult.recordset));
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

export default getPostCodesBagCharges;

