import errorCodes from '../../common/error-codes';
import getOrderIdStoreId from '../common/get-orderid-storeid';
import orderMapper from './mapper.js';
import repository from '../../resolver/repository';
const businessErrorCodes = errorCodes.BusinessErrorCodes;

export default function getOrder(orderIdentifier, context) {
	if (orderIdentifier == 0) {
		return getBaskets(context);
	} else {
		return getOrderDetails(orderIdentifier, context);
	}
}

async function getBaskets(context) {
	let orders = await repository.getBaskets(context);
	
	if(!orders) {
		return null;
	}
	
	let addressIds = [], collectionStores = [], postCodes = [], basketIds = [];

	for (let count = 0, len = orders.length; count < len; count++) {
		let addressId = orders[count].Delivery[0].Addresses.DeliveryAddress.MartiniAddressId;
		let locationId = orders[count].Delivery[0].Location.Id;
		let postCode = orders[count].Delivery[0].Addresses.DeliveryAddress.PostCode;
		basketIds.push(orders[count].Header.Id);

		if (!postCodes.includes(postCode))
			postCodes.push(postCode);

		if (addressId && !addressIds.includes(addressId)) {
			addressIds.push(addressId);
		} else if (!addressId && !collectionStores.includes(locationId)) {
			collectionStores.push(locationId);
		}
	}

	let parallelTasks = [
		repository.getPersonalDetails(context),
		repository.getAddresses(context, addressIds),
		repository.getPostCodesBagCharges(context, postCodes),
		repository.getGlobalSubstitutionDetails(context),
		repository.getSubstitutionDetails(context, basketIds)];

	if (collectionStores.length) {
		parallelTasks.push(repository.getCollectionAddresses(context, collectionStores));
	}

	let [personalInfo, addressInfo, bagChargeDetails, globalPreferences, substitutionDetails, collectionStoresInfo] = await Promise.all(parallelTasks);
	let homeAddress = addressInfo.get('HomeAddress');
	let billingAddress = addressInfo.get('BillingAddress');

	if (!homeAddress || !billingAddress) {
		return Promise.reject(new Error('Home or Blling Address Not Present.'));
	}
	
	return orders.map(order => {
		return orderMapper(personalInfo, addressInfo, billingAddress, collectionStoresInfo, bagChargeDetails, globalPreferences, substitutionDetails, order);
	});
}

async function getOrderDetails(orderIdentifier, context) {
	let orderIdStoreId = getOrderIdStoreId(orderIdentifier);
	let orderId = orderIdStoreId.OrderId;
	let storeId = orderIdStoreId.StoreId;
	let contractId = await repository.getContractId(orderId, storeId, context);

	if(contractId > 0){
		return await repository.getContract(contractId, context);
	}
	return Promise.reject(new Error(businessErrorCodes.invalidOrderIdentifier.err_message));
}

