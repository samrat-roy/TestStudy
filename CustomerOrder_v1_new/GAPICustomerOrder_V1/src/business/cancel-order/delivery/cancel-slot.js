import mapDeliveryStatus from './map-delivery-status';
import {DeliverySlotStatus} from '../../../common/types';
import {DeliveryType} from '../../../common/types';
import repository from '../../../resolver/repository';
const VANDELIVERY = DeliveryType.getKey(0);
const CANCELLEDSTATUS = DeliverySlotStatus.getKey(4);
async function cancelSlot(context, order) {

	if (order.Delivery[1] && order.Delivery[1].SlotState == DeliverySlotStatus.getKey(1)) {

		cancelBookedOrReservedSlot(context, order.Delivery[1].Option == VANDELIVERY ? order.Header.MartiniOrderId : '', order.Delivery[1]);	

	}
	
	return [mapDeliveryStatus(await cancelBookedOrReservedSlot(context, order.Header.MartiniOrderId, order.Delivery[0]),order.Delivery[0], CANCELLEDSTATUS )];
}

async function cancelBookedOrReservedSlot(context, orderId, deliveryDetails) {
	return deliveryDetails.Option == VANDELIVERY ?
		await repository.cancelDeliverySlot(context, orderId, deliveryDetails.StoreId, deliveryDetails.ReservationId) :
		await repository.cancelCollectionSlot(context, orderId, deliveryDetails.Location.Id, deliveryDetails.SlotStartDateTime, deliveryDetails.SlotEndDateTime);
}

export default cancelSlot;

