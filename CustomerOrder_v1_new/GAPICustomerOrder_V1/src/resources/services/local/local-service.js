import config from '../../../config';
import { CouponAssociationStatus } from '../../../common/types';
import logger from '../../../resolver/logger';
import lodash from 'lodash';
import request from 'request';

let headers = { 'content-type': 'application/json', 'authorization': 'Bearer abc123efg' };

function addWalletItems(context, paymentItems, reservationId) {
	logger.logError('Local Add To Wallet Service - Items are added in wallet');
}

function cancelCollectionSlot(context, orderId, locationId, slotStartDateTime, slotEndDateTime) {
	if (locationId == 7261)
		return Promise.resolve(false);
	else return Promise.resolve(true);
}

function cancelContract(context, contractId) {
	if (contractId == 493261)
		return Promise.reject('Error in cancelling contract for contract id -' + contractId + 'user-' + context.customerId);
	else
		return Promise.resolve();
}

function cancelDeliverySlot(context, orderId, storeId, reservationId) {
	if (storeId == 2654)
		return Promise.resolve(false);
	else return Promise.resolve(true);
}

function deleteWalletItems(context, codes, reservationId) {
	if (codes.includes('TFYKZ6G473PL'))
		return Promise.resolve(false);
	else return Promise.resolve(true);
}

function getPersonalInfo(context) {
	return new Promise((resolve, reject) => {
		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/customer?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			resolve(JSON.parse(response.body));
		});
	});
}

function getAddresses(context, addressIdList) {
	return new Promise((resolve, reject) => {
		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/getAddress?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			let result = JSON.parse(response.body);
			let addressDetails = new Map();
			addressDetails.set('BillingAddress', result);
			addressDetails.set('HomeAddress', result);
			addressIdList.forEach(id => {
				result.MartiniAddressId = id;
				addressDetails.set(id, result);
			});
			return resolve(addressDetails);
		});
	});
}

function getCollectionAddresses(context, locationIdList) {
	return new Promise((resolve, reject) => {
		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/getLocation?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			let result = JSON.parse(response.body);
			let addressDetails = new Map();
			locationIdList.foreach(id => {
				result.Id = id;
				addressDetails.set(id, result);
			});
			return resolve(addressDetails);
		});
	});
}

function getGlobalSubstitutionDetails(context) {
	return Promise.resolve({ 'GlobalSubstitutionOption': lodash.sample(['DoNotSubstitute', 'FindSuitableAlternative']) });
}

function restoreCoupons(context, coupons, clubcardNumber, contractId) {
	let cancelledStatus = CouponAssociationStatus.getKey(3);
	return new Promise((resolve) => {
		let result = coupons.map(coupon => {
			coupon.AssociationStatus = coupon.Id == ('AVNYT8BPX6RR' || 'GCDK7NJV964T') ? coupon.AssociationStatus : cancelledStatus;
			return coupon;
		});
		resolve(result);
	});
}

function sendNotification(notification) {
	logger.logError('Local Notification Service - Cancel order confirmation mail sent');
}

module.exports = {
	addWalletItems,
	cancelCollectionSlot,
	cancelContract,
	cancelDeliverySlot,
	deleteWalletItems,
	getPersonalInfo,
	getAddresses,
	getCollectionAddresses,
	getGlobalSubstitutionDetails,
	restoreCoupons,
	sendNotification
};
