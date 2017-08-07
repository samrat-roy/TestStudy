import config from '../../../../config';
import logger from '../../../../resolver/logger';
import request from 'request-promise';

function deleteWalletItems(context, couponCodes, reservationId = null) {
	let options = {
		method: 'DELETE',
		headers: {
			'Authorization': context.authToken,
			'Content-Type': 'application/json'
		},
		uri: (config.vips.storedvalue + config.api.urls.storedvalue.deletewalletitems.replace(/codes=/i, 'codes=' + couponCodes.join)),
		json: true,
		resolveWithFullResponse: true
	};

	options.uri = reservationId ? options.uri.replace(/reservationid=/i, 'reservationid=' + reservationId) :
		options.uri.replace(/reservationid=&/i, '');

	return new Promise((resolve) => {
		request(options).then(() => resolve(true)).catch(err => {
			resolve(false);
			logger.logError(err); // TO DO - LOG PROPERLY
		});
	});

}

export default deleteWalletItems; 