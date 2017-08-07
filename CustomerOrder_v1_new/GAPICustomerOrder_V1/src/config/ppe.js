'use strict';

module.exports = {
	'environment': 'ppe',
	'applicationPort': 9001,
	'baseUri': 'http://127.0.0.1:9001/',
	'apiProviders': {
		'persistenceProvider': 'in-memory',
		'cacheProvider': 'in-memory',
		'businessProvider': 'version1'
	},
	'configurationDB': {
		user: 'Tiramisu',
		password: 'Un]iXc8U5^]8Mh@+j}v2', server: 'PPEDB03.PPE.DOTCOM.TESCO.ORG',
		database: 'Configuration',
		encrypt: true
		, port: 1433
	},
	'BasketDBPort': 4024,
	'DefaultDBPort': 1433,
	'GroceryContractDBPort': 4840,
	'loggerLogMode': 'rotating-file',
	'SurchargeProductId': '264843894',
	'vips': {
		'grocerypreference': 'http://dvghsmapiw005uk/',
		'tescolocation': 'http://ukppe02-app-tescolocation-gapi.ppe.dotcom.tesco.org',
		'storedvalue': 'http://ukppe02-app-storedvalue-gapi.ppe.dotcom.tesco.org',
		'transport': 'http://ukppe02-app-transport-gapi.ppe.dotcom.tesco.org'
	},
	'anonymousToken': 'appKeyToken=GroceryProviderUser001&AppKey=ZABMtuRt30erbbpXyad-KC87nic1JeusYpjK5DS7DOrOEVuz0GMNuP9KKIO9SKnO0'
};
