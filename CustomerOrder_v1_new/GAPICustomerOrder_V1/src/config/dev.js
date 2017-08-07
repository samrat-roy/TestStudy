module.exports = {
	'environment': 'dev',
	'applicationPort': 9001,
	'baseUri': 'http://127.0.0.1:9001/',
	'apiProviders': {
		'persistenceProvider': 'in-memory',
		'cacheProvider': 'in-memory',
		'businessProvider': 'version1'
	},
	'configurationDB': {
		user: 'DevApp2015',
		password: '2015DevApp',
		server: 'UKDBT45SQLDB01V.dotcom.tesco.org\\dbtcc',
		database: 'Configuration',
		encrypt: true
	},
	'BasketDBPort': 1275,
	'DefaultDBPort': 1275,
	'GroceryContractDBPort': 1275,
	'loggerLogMode': 'rotating-file',
	'SurchargeProductId': '264843894',
	'vips': {
		'grocerypreference': 'http://dvghsmapiw005uk/',
		'tescolocation':'http://172.25.58.107:67/',
		'storedvalue' : 'http://172.25.58.107:67/',
		'transport' : 'http://ukdbt23build04v:205/'
	},
	'anonymousToken':'appKeyToken=GroceryProviderUser001&AppKey=vyvYgzkd-EWZwiIfbwd0AL5HbQ-Oj_poUha8ltyttfL0aM1x3y2lRABc56IJzYP-0'
};
