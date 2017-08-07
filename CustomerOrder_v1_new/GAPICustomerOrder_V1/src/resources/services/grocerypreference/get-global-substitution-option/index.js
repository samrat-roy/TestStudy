import request from 'request';
import config from '../../../../config';
import commonTypes from '../../../../common/types';

function getGlobalSubstitutionDetails(context){
	let headers = {
		'Authorization': context.authToken,
		'Content-Type': 'application/json'
	};
	let options = {
		url: config.vips.grocerypreference + config.api.urls.grocerypreference.getglobalsubstitutiondetails,
		method: 'GET',
		headers: headers
	};
	if (!config.api.isv2tokenrequired)
		options.url = options.url + '?customerid=' + context.customerId;

	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body) {
				let result = JSON.parse(body);
				return resolve({'GlobalSubstitutionOption' : result.CustomerPreference.SubstituteAllItems == 'False' ? commonTypes.SubstitutionOption.get(1).key : commonTypes.SubstitutionOption.get(3).key});
			} else return reject(new Error('Error in get global substitution details.'+ error));
		});
	});
}

export default getGlobalSubstitutionDetails;