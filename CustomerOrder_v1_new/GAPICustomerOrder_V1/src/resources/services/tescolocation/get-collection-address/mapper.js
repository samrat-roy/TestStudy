import resourceTypes from '../../../types';

exports.mapLocationDetails = function getAddressFromTescoLocation(location) {
	let locationDetails = resourceTypes.getLocationDetailsAttributes();
	let addressLines = location.Address.AddressLines;
	locationDetails.BuildingNameNumber = getAddressLineValue('Address1', addressLines);
	locationDetails.StreetName = getAddressLineValue('Address2', addressLines);
	locationDetails.Locality = getAddressLineValue('Address3', addressLines);
	locationDetails.PostalTown = getAddressLineValue('Address4', addressLines);
	locationDetails.LegacyAddressString = getLegacyAddressString(locationDetails.BuildingNameNumber, locationDetails.StreetName, locationDetails.Locality,
		locationDetails.PostalTown, getAddressLineValue('Address5', addressLines));
	locationDetails.Id = location.LocationId;
	locationDetails.PostCode = location.Address.PostCode;
	locationDetails.Nickname = location.Name;
	locationDetails.Latitude = location.Address.Coordinate.Latitude;
	locationDetails.Longitude = location.Address.Coordinate.Longitude;
	return locationDetails;
};

function getAddressLineValue(adressLineName, addressLines) {
	let addressInfo = addressLines.find(item => item.Name == adressLineName);
	if (addressInfo) return addressInfo.Value; else return '';
}

function getLegacyAddressString(addressLine1, addressLine2, addressLine3, addressLine4, addressLine5) {
	let legacyAddressString = '';

	if (addressLine1 && addressLine1.trim()) {
		legacyAddressString = legacyAddressString.concat(addressLine1.trim());
		legacyAddressString = legacyAddressString.concat(',');
	}

	if (addressLine2 && addressLine2.trim()) {
		legacyAddressString = legacyAddressString.concat(addressLine2.trim());
		legacyAddressString = legacyAddressString.concat(',');
	}

	if (addressLine3 && addressLine3.trim()) {
		legacyAddressString = legacyAddressString.concat(addressLine3.trim());
		legacyAddressString = legacyAddressString.concat(',');
	}

	if (addressLine4 && addressLine4.trim()) {
		legacyAddressString = legacyAddressString.concat(addressLine4.trim());
		legacyAddressString = legacyAddressString.concat(',');
	}

	if (addressLine5 && addressLine5.trim()) {
		legacyAddressString = legacyAddressString.concat(addressLine5.trim());
		legacyAddressString = legacyAddressString.concat(',');
	}

	let length = legacyAddressString.length;

	if (length && legacyAddressString[length - 1] == ',')
		legacyAddressString = legacyAddressString.substring(0, length - 1);

	return legacyAddressString;
}

