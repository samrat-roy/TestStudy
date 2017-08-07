import _ from 'lodash';
import config from '../../../../config';
import logger from '../../../../resolver/logger';
import request from 'request-promise';

function cancelCollectionSlot(context, orderId, storeId, slotStartTime, slotEndTime) {
	const STATUS = 'Status';
	let options = {
		method: 'POST',
		headers: {
			'Authorization': context.authToken,
			'Content-Type': 'application/json'
		},
		uri: (config.vips.transport + config.api.urls.transport.cancelcollectionslot),
		body: [{
			'LocationId': storeId.toString(),
			'SlotStartDateTime': slotStartTime,
			'SlotEndDateTime': slotEndTime,
			'ServiceType': 'CLICK_AND_COLLECT',
			'BookingReferenceID': orderId.toString()
		}],
		json: true
	};

	return new Promise((resolve) => {
		request(options).then(response => {
			if (response && response.length) {
				let responseDetails = _.last(response[0].split(','));
				let status = responseDetails && responseDetails.includes(STATUS) && /true/i.test(responseDetails.split('|')[1]) ;				
				resolve(status);
				
				if (!status) {
					logger.logError(new Error('Cancel Collection Slot failed for orderid ' + orderId + '.user - ' + context.customerId));
				}

			} else {
				resolve(false);
				logger.logError(new Error('Cancel Collection Slot failed for orderid ' + orderId + '.user - ' + context.customerId));
			}

		}).catch(err => {
			resolve(false);
			logger.logError('Cancel Collection Slot failed for orderid ' + orderId + '.user - ' + context.customerId + '.' + err.message);  // TO DO : MODIFY LOGGING WITH PROPER CODE.
		});
	});
}

export default cancelCollectionSlot; 