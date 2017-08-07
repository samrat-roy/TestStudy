import request from 'request';
import config from '../../../config';
import types from '../../types';
import lodash from 'lodash';
import logger from '../../../resolver/logger';
let headers = { 'content-type': 'application/json', 'authorization': 'Bearer abc123efg' };

function getBaskets(context) {
	return new Promise((resolve, reject) => {
		
		if(context.customerId == 2301108427){
			return resolve(null);
		}

		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/getBasketOrder?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			resolve(JSON.parse(response.body));
		});
	});
}

function getContractIdForOrderId(orderId, storeId, context) {
	return new Promise((resolve, reject) => {
		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/getContractOrder?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			resolve(JSON.parse(response.body).Header.ContractID);
		});
	});
}

function getContract(contractId, context) {
	return new Promise((resolve, reject) => {
		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/getContractOrder?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			resolve(JSON.parse(response.body));
		});
	});
}

function getOrderDiff(contractId, context) {
	return new Promise((resolve, reject) => {
		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/getOrderVersions?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			resolve(JSON.parse(response.body).slice(0, 2));
		});
	});
}

function getOrders(context, dxshCustomerId) {
	return new Promise((resolve, reject) => {
		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/ordersummary?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			let parsedResponse = JSON.parse(response.body); resolve(parsedResponse);
		});
	});
}

function getSubstitutionDetails(context, basketIds) {
	let result = new Map();
	let options = ['DoNotSubstitute', 'FindSuitableAlternative'];
	let pickerNotes = ['pickerNoteA', 'pickerNote12', 'pickerNoteB', 'pickerNoteC'];
	basketIds.splice(0, 1);

	basketIds.forEach(id => {
		let substitutionDetails = types.getSubstitutionDetailsAttributes();
		substitutionDetails.options = lodash.sample(options);
		substitutionDetails.PickerNote = lodash.sample(pickerNotes);
		result.set(id, substitutionDetails);
	});

	return Promise.resolve(result);
}

function getPostCodesBagCharges(context, postCodes) {
	let chargeInfo = types.getPostCodeChargeAttributes();
	chargeInfo.Amount = 0.35;
	chargeInfo.IsOptional = false;
	chargeInfo.HelpURL = 'http://helperurl',
		chargeInfo.PostCode = postCodes[0];
	return Promise.resolve([chargeInfo]);
}

function getContractHeaders(context, contractIds) {	
	return new Promise((resolve, reject) => {
		request.get({ headers: headers, url: config.api.mockjsonserverurl + '/getOrdersFromContractHeaders?' + 'customerid=' + context.customerId }, function (error, response) {
			if (error) reject(error);
			let parsedResponse = JSON.parse(response.body); resolve(parsedResponse);
		});
	});
}

function removeUnusedSmartCoupons(context, couponIds, orderId, storeId){
	logger.logError('Local Repository - smart coupons removed from payment order used table successfully');
}


module.exports = {
	getBaskets,
	getContract,
	getContractIdForOrderId,
	getContractHeaders,
	getOrderDiff,
	getOrders,
	getPostCodesBagCharges,
	getSubstitutionDetails,
	removeUnusedSmartCoupons	
};
