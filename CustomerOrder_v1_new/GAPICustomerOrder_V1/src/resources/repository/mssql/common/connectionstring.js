let DbConnectors = {
	'LegacySecureDBConnector': {
		'key': 'LegacySecureDataConnector',
		'connectionString': null,
		'pool': {
			'max': 10,
			'min': 0,
			'idleTimeoutMillis': 30000
		}
	},
	'BasketDBConnector': {
		'key': 'BasketDB',
		'connectionString': null,
		'pool': {
			'max': 10,
			'min': 0,
			'idleTimeoutMillis': 30000
		}
	},
	'GroceryContractDBConnector': {
		'key': 'GroceryContractDB',
		'connectionString': null,
		'pool': {
			'max': 10,
			'min': 0,
			'idleTimeoutMillis': 30000
		}
	},
	'SubstitutionDBConnector': {
		'key': 'SubstitutionsDB',
		'connectionString': null,
		'pool': {
			'max': 10,
			'min': 0,
			'idleTimeoutMillis': 30000
		}
	}
};
export default DbConnectors;