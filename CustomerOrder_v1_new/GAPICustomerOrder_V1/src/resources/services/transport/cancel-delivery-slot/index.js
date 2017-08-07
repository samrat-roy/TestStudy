import config from '../../../../config';
import logger from '../../../../resolver/logger';
import request from 'request-promise';

function cancelDeliverySlot(context, orderId, storeId, reservationId) {
	let options = {
		method: 'POST',
		headers: {
			'Authorization': context.authToken,
			'Content-Type': 'application/json'
		},
		uri: (config.vips.transport + config.api.urls.transport.canceldeliveryslot.replace(/storeid/i, storeId)),
		body: { 'OrderID': orderId.toString(), 'ReservationID': reservationId.toString() },
		json: true
	};
	return new Promise((resolve) => {
		request(options).then(response => {
			if (response) {
				let unreserveResponse = response.split(',');
				let status = /true/i.test(unreserveResponse[0].split('|')[1].trim());
				resolve(status);

				if (!status) {
					logger.logError(new Error('Cancel Delivery Slot failed for orderid' + orderId + '.user - ', + context.customerid + '.FailureCode - ', + unreserveResponse[1].split('|')[1] + '.FailureReason -' + unreserveResponse[2].split('|')[1]));
				}

			}else resolve(false);
		}).catch(err => {
			resolve(false);
			logger.logError(err); // TO DO - LOG PROPERLY
		});
	});
}

export default cancelDeliverySlot; 