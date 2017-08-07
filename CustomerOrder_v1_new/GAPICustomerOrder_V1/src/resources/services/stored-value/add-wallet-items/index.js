import config from '../../../../config';
import logger from '../../../../resolver/logger';
import prepareRequest from './prepare-request';
import request from 'request-promise';

function addPaymentItemsToWallet(context, paymentItems, reservationId ) {
	let options = {
		method: 'POST',
		headers: {
			'Authorization': context.authToken,
			'Content-Type': 'application/json'
		},
		uri: (config.vips.storedvalue + config.api.urls.storedvalue.addWalletitems),
		body: prepareRequest(paymentItems, reservationId),
		json: true,
		resolveWithFullResponse : true
	};
	
	request(options).catch(err => {
		logger.logError(err); // TO DO - LOG PROPERLY
	});
}

export default addPaymentItemsToWallet; 