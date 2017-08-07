function mapOrder(personalInfo, deliveryAddresses, billingAddress, collectionStoresInfo, bagChargeList, globalPreferences, substitutionDetails, order) {

	order.Customer = personalInfo;
	order.Delivery = mapDeliveryToOrder(order, deliveryAddresses, billingAddress, collectionStoresInfo);
	
	let bagChargeInfo = bagChargeList.find(item => item.PostCode == order.Delivery[0].Addresses.DeliveryAddress.PostCode);

	if (bagChargeInfo) {
		order.Delivery[0].Charges = mapBagChargeDetailsToOrder(bagChargeInfo, order.Delivery[0].Charges);
	}

	order.LineItems = order.LineItems ? mapLineItemPreferenceDetails(globalPreferences, substitutionDetails, order.LineItems) : null;
	return order;
}

function mapDeliveryToOrder(order, deliveryAddresses, billingAddress, collectionStoresInfo) {
	let orderDeliveryAddress = order.Delivery[0].Addresses.DeliveryAddress;

	if (orderDeliveryAddress.MartiniAddressId) {
		order.Delivery[0].Addresses.DeliveryAddress = deliveryAddresses.get(orderDeliveryAddress.MartiniAddressId);
	} else {
		let collectionAddress = collectionStoresInfo.get(order.Delivery[0].Location.Id);
		orderDeliveryAddress.BuildingNameNumber = collectionAddress.BuildingNameNumber;
		orderDeliveryAddress.LegacyAddressString = collectionAddress.LegacyAddressString;
		orderDeliveryAddress.Locality = collectionAddress.Locality;
		orderDeliveryAddress.Nickname = collectionAddress.Nickname;
		orderDeliveryAddress.PostalTown = collectionAddress.PostalTown;
		orderDeliveryAddress.StreetName = collectionAddress.StreetName;
		order.Delivery[0].Location.Lat = collectionAddress.Latitude;
		order.Delivery[0].Location.Long = collectionAddress.Longitude;
	}

	order.Delivery[0].Addresses.BillingAddress = billingAddress;
	return [order.Delivery[0]];
}

function mapBagChargeDetailsToOrder(bagChargeInfo, orderCharges) {
	orderCharges.BagCharge.Amount = bagChargeInfo.Amount;
	orderCharges.BagCharge.HelpURL = bagChargeInfo.HelpURL;
	orderCharges.BagCharge.IsOptional = bagChargeInfo.IsOptional;
	return orderCharges;
}

function mapLineItemPreferenceDetails(globalPreferences, substitutionDetails, lineItems) {
	return lineItems.map(item => {
		let itemPreferences = substitutionDetails.get(item.BaseProductId);
		
		if (itemPreferences) {
			item.PickerNote = itemPreferences.PickerNote;
			item.SubstitutionOption = itemPreferences.SubstitutionOption;
		} else {
			item.SubstitutionOption = globalPreferences.GlobalSubstitutionOption;
		}

		return item;
	});
}

export default mapOrder;