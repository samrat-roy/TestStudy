import config from '../../../../config';
import sql from 'mssql';
import parser from 'xml2js';
let configDBPool = { ConfigSettingsDB: null };
const CONN_STRING_SP = '[configuration].[ConnectionStringGet]';
module.exports = {
	getConnectionString: function (data) {
		return new Promise((resolve, reject) => {
			if (data.connectionString) resolve(data.connectionString);
			else {
				getConnectionStringPromise(data.key).then((connStrFromDB) => {
					data.connectionString = connStrFromDB;
					resolve(connStrFromDB);
				}).catch((reason) => reject(reason));
			}
		});
	}
};

function getConnectionStringPromise(key) {
	return new Promise((resolve, reject) => {
		let spResult = '';
		getConfigConnectionPool().then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('connectionStringKey', sql.VarChar(50), key);
			request.output('connectionStringValue', sql.VarChar(8000));
			request.execute(CONN_STRING_SP).then((result) => {
				spResult = result.output.connectionStringValue;
				if (spResult) {
					parseConnectionString(spResult, key).then(parsedConnectionString => resolve(parsedConnectionString))
                    .catch(reason => reject(reason));
				} else reject(new Error('Connection String Not Found'));
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

function getConfigConnectionPool() {
	return new Promise((res, rej) => {
		if (configDBPool.ConfigSettingsDB) res(configDBPool.ConfigSettingsDB);
		else {
			let configConnectionPool = new sql.ConnectionPool(config.configurationDB);
			configConnectionPool.connect().then(connectionPool => {
				configDBPool.ConfigSettingsDB = connectionPool;
				res(configDBPool.ConfigSettingsDB);
			}).catch(err => rej(err));
		}
	});
}


function parseConnectionString(spResult, key) {
	return new Promise((resolve, reject) => {
		parser.parseString(spResult, (err, result) => {
			if (err) {
				reject(err);
			} else {
				let connectionStringRaw = result.ConnectionStringSettings.connStr.toString();
				let connectionString = {
					user: parseUser(connectionStringRaw),
					password: parsePassword(connectionStringRaw),
					server: parseServer(connectionStringRaw),
					database: parseDatabase(connectionStringRaw),
					port: getDbPortNumber(connectionStringRaw, key)
				};
				resolve(connectionString);
			}
		});
	});
}

function parseServer(string) {
	let parsedString = string.match(/Data Source=([^;]+)/)[1];
	let str = ' ';

	if (parsedString.indexOf('\\') > -1) {
		let result = parsedString.split('\\');
		str = result[0];
	} else {
		str = parsedString;
	}
	return str;
}

function parseUser(string) {
	let res = string.match(/User ID=([^;]+)/)[1];
	return res;
}

function parsePassword(string) {
	let res = string.match(/Password=([^;]+)/)[1];
	return res;
}

function parseDatabase(string) {
	let res = string.match(/Initial Catalog=([^;]+)/)[1];
	return res;
}

function getDbPortNumber(string, key) {
	let portNumber = null;
	let parsedServerString = string.match(/Data Source=([^;]+)/)[1];
	if (parsedServerString.indexOf('\\') > -1) {
		switch (key) {
		case 'BasketDB':
			portNumber = config.BasketDBPort;
			break;
		case 'GroceryContractDB':
			portNumber = config.GroceryContractDBPort;
			break;
		default:
			portNumber = config.DefaultDBPort;
			break;
		}
	}
	return portNumber;
}

