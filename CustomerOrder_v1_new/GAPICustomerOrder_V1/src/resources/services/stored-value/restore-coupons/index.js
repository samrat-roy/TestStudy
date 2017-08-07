import config from '../../../../config';
import _ from 'lodash';
import logger from '../../../../resolver/logger';
import mapCouponsByStatus from '../common/storedvalue-coupons-status-mapper';
import {CouponAssociationStatus} from '../../../../common/types';
import request from 'request-promise';

function restoreCoupons(context, coupons, clubcardNumber, contractId) {
	const RESTOREDSTATUS = CouponAssociationStatus.getKey(3);
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
		uri: (config.vips.storedvalue + config.api.urls.storedvalue.restorecoupons).replace(/codes=/i, 'codes=' + _.map(coupons, 'Id').join()),
		body: requestPayload,
		json: true
	};
	return new Promise((resolve) => {
		request(options).then(response => {
			resolve(mapCouponsByStatus(response, coupons, RESTOREDSTATUS));
		}).catch(err => {
			resolve(coupons);
			logger.logError(err); // TO DO - LOG PROPERLY
		});
	});

}

export default restoreCoupons; 