import Enum from 'enum';
const DeliverySlotStatus = new Enum({
	'PreBooked': 1,
	'Confirmed': 2,
	'Unspecified': 3,
	'Cancelled': 4
});
export default DeliverySlotStatus;
