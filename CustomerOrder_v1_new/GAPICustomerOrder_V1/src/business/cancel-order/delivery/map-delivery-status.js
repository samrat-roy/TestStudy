import orderEntity from '../../../common/types';


export default function mapDeliveryStatus(isProcessingSuccess, deliveryDetails, statusToBeMapped){
	deliveryDetails.SlotState = isProcessingSuccess ? statusToBeMapped : deliveryDetails.SlotState;
	return deliveryDetails;
}