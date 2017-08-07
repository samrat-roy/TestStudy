import { CouponAssociationStatus } from '../../common/types';
import deliveryUtility from './delivery';
import filter from 'lodash/filter';
import { OrderStatus } from '../../common/types';
import orderUtility from './order';
import paymentItemUtility from './payment-items';

export default async function cancelOrder(order, context) {
	
	const CONFIRMEDCOUPONSTATUS = CouponAssociationStatus.getKey(2);
	let clubCardNumber = order.Customer.ClubcardNumber ? order.Customer.ClubcardNumber.toString() : '0';
	let result = {
		Header: order.Header,
		Delivery: [],
		Discounts: order.Discounts
	};
	let parallelTasks = [];

	result.Header = order.Header;
	parallelTasks.push(deliveryUtility.cancelSlot(context, order));
	
	if (order.Discounts && order.Discounts.Coupons) {
		let coupons = filter(order.Discounts.Coupons, {'AssociationStatus' : CONFIRMEDCOUPONSTATUS});

		if(coupons && coupons.length){
			parallelTasks.push(paymentItemUtility.cancelPaymentItems(order,coupons, clubCardNumber, context));
		}		
	}

	parallelTasks.push(orderUtility.cancelContract(context, order.Header.ContractID));

	try {
		let parallelTaskResult = await Promise.all(parallelTasks);
		result.Header.Status = OrderStatus.getValue('CancelledByUser');
		result.Delivery = parallelTaskResult[0];
		result.Discounts.Coupons = parallelTaskResult.length == 3 ? parallelTaskResult[1] : null;
	} catch (err) {
		paymentItemUtility.undoPaymentItems(context, result.Discounts.Coupons, clubCardNumber, order.Header.ContractID);
		return Promise.reject(err);
	}

	orderUtility.sendEmail(order, context);
	return result;
}








