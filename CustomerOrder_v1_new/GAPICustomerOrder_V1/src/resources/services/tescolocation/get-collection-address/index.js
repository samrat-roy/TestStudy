import request from 'request';
import config from '../../../../config';
import mapper from './mapper.js';
import async from 'async';

function getCollectionAddresses(context, locationIdList) {
	return new Promise((resolve, reject) => {
		let httpOptions = {
			method: 'GET',
			headers: {
				'Authorization': context.anonymousToken,
				'Content-Type': 'application/json'
			}
		};
		let tescoLocationRequests = [];
		for (let count = 0, len = locationIdList.length; count < len; count++) {
			httpOptions.url = config.vips.tescolocation + config.api.urls.tescoLocation.getlocationdetails + locationIdList[count];
			tescoLocationRequests.push(function (callback) {
				request(httpOptions, function (error, response, body) {
					if (!error && response.statusCode == 200 && body) {
						let tescoLocation = JSON.parse(body);
						if (!tescoLocation) callback(new Error('Location Details is null for storeid ' + locationIdList[count]));
						else callback(null, mapper.mapLocationDetails(tescoLocation));
					}
					else callback(new Error('Unable to get location details.' + error));
				});
			});
		}
		async.parallel(tescoLocationRequests, (err, response) => {
			if (err) return reject(err);
			let collectionLocationDetails = new Map();
			response.forEach(item => {
				collectionLocationDetails.set(item.Id, item);
			});
			return resolve(collectionLocationDetails);
		});
	});
}

export default getCollectionAddresses;
