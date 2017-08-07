import request from 'request';
import config from '../../../../config';
import mapper from './mapper';

function getPersonalInfo(context) {
	let headers = {
		'Authorization': context.authToken,
		'Content-Type': 'application/json'
	};
	let options = {
		url: config.vips.grocerypreference + config.api.urls.grocerypreference.getpersonaldetails,
		method: 'GET',
		headers: headers
	};
	if (!config.api.isv2tokenrequired)
		options.url = options.url + '?customerid=' + context.customerId;

	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body) {
				let result = JSON.parse(body);
				return resolve(mapper.mapPersonalDetails(result.PersonalDetails));
			} else return reject(new Error('PersonalDetails unavailable.'+ error));
		});
	});
}

export default getPersonalInfo;