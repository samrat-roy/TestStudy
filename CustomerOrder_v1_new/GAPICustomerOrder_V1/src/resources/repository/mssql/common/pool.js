import DbConnectors from './connectionstring';
import martiniConfiguration from './martiniconfiguration';
let sql = require('mssql');

let pool = {
	LegacySecureDBPool: null,
	BasketDBPool: null,
	GroceryContractDBPool:null,
	SustitutionDBPool:null
};

function getConnectionPool(type) {
	return new Promise((resolve, reject) => {
		validate(pool[type], type, function(err, response){ 
			if(err)reject(err);
			else resolve(response);
		});
	});
}

function validate(pool, type, callback) {
	let connector = null;
	switch(type){
	case 'LegacySecureDBPool' : connector = DbConnectors.LegacySecureDBConnector;break;
	case 'BasketDBPool' : connector = DbConnectors.BasketDBConnector;break;
	case 'GroceryContractDBPool' : connector  = DbConnectors.GroceryContractDBConnector;break;
	case 'SustitutionDBPool' :connector = DbConnectors.SubstitutionDBConnector;break;
	default: return callback('Invalid Pool Type');
	}
	if (pool) {
		process.nextTick(callback, null, pool);
	}else {
		createPool(type,connector,callback);
	}
}

function createPool(type, connector, callback) {
	if (connector.connectionString) {
		let cp = new sql.ConnectionPool(connector.connectionString);
		cp.connect().then((connectionPool) => {
			pool[type] = connectionPool;
			callback(null, pool[type]);
		});
	} else {
		if (pool[type]) {  //Change applied as suggested from Debasis
			callback(null, pool[type]);
		} else {
			martiniConfiguration.getConnectionString(connector).then(() => {
				connector.connectionString.pool = connector.pool;
				let cp = new sql.ConnectionPool(connector.connectionString);
				cp.connect().then((connectionPool) => {
					pool[type] = connectionPool;
					callback(null, pool[type]);
				}).catch(err => callback(new Error('Unable To Connect ToConnectionPool' + err)));
			}).catch(err => callback(new Error('Unable To get Connectiong string' + err)));
		}
	}
}

module.exports = {
	getPool: getConnectionPool
};
