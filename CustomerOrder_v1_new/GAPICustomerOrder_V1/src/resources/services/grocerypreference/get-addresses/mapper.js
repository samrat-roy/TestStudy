import commonTypes from '../../../../common/types';

exports.mapAddressToOrderAddress = function (address) {
	let orderAddress = commonTypes.getAddressAttributes();
	orderAddress.BuildingNameNumber = address.BuildingNameNumber;
	orderAddress.BuildingType = commonTypes.BuildingType.getKey(address.BuildingTypeID);
	let contact = commonTypes.getContactAttributes();
	contact.PhoneDay = address.DayTelephone;
	contact.PhoneEvening = address.EveningTelephone;
	contact.PhoneMobile = address.MobileTelePhone;
	orderAddress.Contact = contact;
	orderAddress.DxshAddressNo = address.DXSHAddressNo;
	orderAddress.GridReference = address.GridRef;
	orderAddress.LegacyAddressString = address.LegacyAddressString;
	orderAddress.Locality = address.Locality;
	orderAddress.MartiniAddressId = address.CustomerAddressID;
	orderAddress.Nickname = address.AddressAlias;
	orderAddress.OrganisationName = address.OrganisationName;
	orderAddress.PafValidated = address.PAFValidated;
	orderAddress.PostalTown = address.PostalTown;
	orderAddress.PostCode  = address.PostCode;
	return orderAddress;
};