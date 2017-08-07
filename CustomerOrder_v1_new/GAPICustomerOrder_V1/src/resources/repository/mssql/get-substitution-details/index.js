import mapper from './mapper.js';
import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'SustitutionDBPool';
const spGetSubstitutionDetails = 'substitution.SubstitutionPreferenceGetWithBasketOverrideGAPI';

function getSubstitutionDetails(context, basketIds) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('BasketIDs', sql.VarChar, basketIds.join());
			request.input('CustomerNumber', sql.BigInt, context.customerId);
			request.execute(spGetSubstitutionDetails).then(spResult => {
				return resolve(mapper.mapSubstitutionDetails(spResult.recordset));
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

export default getSubstitutionDetails;