import {CouponAssociationStatus} from '../../../common/types';
import {CouponType} from '../../../common/types';
import map from 'lodash/map';
import repository from '../../../resolver/repository';
import validator from './validate';
const CANCELLEDCOUPONSTATUS = CouponAssociationStatus.getKey(3);
const CONFIRMEDCOUPONSTATUS = CouponAssociationStatus.getKey(2);

function undoPaymentItems(context, coupons, clubCardNumber, contractId) {
	let cancelledCoupons = coupons.filter(coupon => { return coupon.AssociationStatus == CANCELLEDCOUPONSTATUS; });
	let appliedCoupons = repository.applyCoupons(context, cancelledCoupons, clubCardNumber, contractId);
	
	/* For ecoupons and smart coupons , existing GAPI customerorder checks if master coupon id is present and if yes,
	updates txsh0cvo ([payment].[MasterVoucherRedemptionUpdate]) - this step is not done in this customer order. */

	/* TODO : Add reserved smartcoupons to payment order used - payment.SmartCoupon_AddToOrderUsed. Need to rewrite SP */
	
	let paymentItemsToBeRemoved = appliedCoupons.filter(coupon => {
		return !validator.isSmartCoupon(coupon.Id) && coupon.Type == CouponType.getValue('CouponDescriptorEntity') || 
		validator.isSmartCoupon(coupon.Id) && coupon.AssociationStatus == CONFIRMEDCOUPONSTATUS ||
		coupon.AssociationStatus == CONFIRMEDCOUPONSTATUS;
	});

	repository.deleteWalletItems(context, map(paymentItemsToBeRemoved, 'Id'), null);

}

export default undoPaymentItems;