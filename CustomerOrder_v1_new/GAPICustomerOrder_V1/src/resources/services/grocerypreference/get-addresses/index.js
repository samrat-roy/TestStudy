import request from 'request';
import config from '../../../../config';
import mapper from './mapper';

function getAddressDetails(context, addressIdList) {
	let headers = {
		'Authorization': context.authToken,
		'Content-Type': 'application/json'
	};
	let options = {
		url: config.vips.grocerypreference + config.api.urls.grocerypreference.getaddresses,
		method: 'GET',
		headers: headers
	};
	if (!config.api.isv2tokenrequired)
		options.url = options.url + '?customerid=' + context.customerId;

	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			if (error || response.statusCode != 200) {
				return reject(new Error('Error in Get Addresses', error));
			}

			let addressResult = JSON.parse(body);
			if (!addressResult || !addressResult.Address) {
				return reject(new Error('No Address available for the customer - ' + context.customerId));
			}
			
			let addressDetails = new Map();
			if (!addressResult.Address.length) {
				if (addressIdList.length > 1) {
					return reject(new Error('Some address missing for the customer' + context.customerId));
				}
				if( addressIdList.length ==1 && addressResult.Address.CustomerAddressID != addressIdList[0]){
					return reject(new Error('Address Not found for customer ' + context.customerId + ',addressid ' + addressIdList[0]));
				}
				if (addressResult.Address.IsHomeAddress && addressResult.Address.IsBillingAddress) {
					let mappedAddress = mapper.mapAddressToOrderAddress(addressResult.Address);
					addressDetails.set('HomeAddress', mappedAddress);
					addressDetails.set('BillingAddress', mappedAddress);
					addressDetails.set(addressIdList[0], mappedAddress);
				}
			} else {
				let homeAddress = addressResult.Address.find(address => { return address.IsHomeAddress == true; });
				let billingAddress = addressResult.Address.find(address => { return address.IsBillingAddress == true; });
				if (homeAddress && billingAddress) {
					addressDetails.set('HomeAddress', mapper.mapAddressToOrderAddress(homeAddress));
					addressDetails.set('BillingAddress', mapper.mapAddressToOrderAddress(billingAddress));
					addressIdList.forEach(function (id) {
						let address = addressResult.Address.find(item => item.CustomerAddressID == id);
						if (address) {
							addressDetails.set(id, mapper.mapAddressToOrderAddress(address));
						} else {
							return reject(new Error('Address Not found for customer ' + context.customerId + ',addressid ' + id));
						}
					});
				}
			}
			return resolve(addressDetails);
		});
	});
}

export default getAddressDetails;