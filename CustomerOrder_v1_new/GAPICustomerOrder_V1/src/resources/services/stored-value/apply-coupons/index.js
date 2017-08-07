import config from '../../../../config';
import map from 'lodash/map';
import logger from '../../../../resolver/logger';
import mapCouponsByStatus from '../common/storedvalue-coupons-status-mapper';
import {CouponAssociationStatus} from '../../../../common/types';
import request from 'request-promise';

function applyCoupons(context, coupons, clubcardNumber, contractId) {
	let requestPayload = [{
		'DetailName': 'ContractID',
		'DetailValue': contractId
	}, {
		'DetailName': 'ClubCardNumber',
		'DetailValue': clubcardNumber
	}];
	let options = {
		method: 'POST',
		headers: {
			'Authorization': context.authToken,
			'Content-Type': 'application/json'
		},
		uri: (config.vips.storedvalue + config.api.urls.storedvalue.applycoupons).replace(/codes=/i, 'codes=' + map(coupons, 'Id').join()),
		body: requestPayload,
		json: true
	};
	return new Promise((resolve) => {
		request(options).then(response => {
			resolve(mapCouponsByStatus(response, coupons, CouponAssociationStatus.getKey(2)));
		}).catch(err => {
			resolve(coupons);
			logger.logError(err); // TO DO - LOG PROPERLY
		});
	});

}

export default applyCoupons; 