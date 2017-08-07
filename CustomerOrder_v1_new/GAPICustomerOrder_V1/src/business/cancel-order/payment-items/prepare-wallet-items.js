import orderEntity from '../../../common/types';
import validator from './validate';

function prepareWalletPaymentItems(coupons, reservationId=null){

	const eCouponType = orderEntity.CouponType.getValue('CouponDescriptorEntity');
	const cancelledStatus = orderEntity.CouponAssociationStatus.getKey(3);
	let paymentItems = {SmartCoupons : [], ECoupons:[], Vouchers : []};
	
	coupons.forEach(coupon => {
		if(!validator.isSmartCoupon(coupon.Id) && coupon.Type == eCouponType){
			paymentItems.ECoupons.push(coupon);
		}else if(validator.isSmartCoupon(coupon.Id) && coupon.AssociationStatus == cancelledStatus){
			paymentItems.SmartCoupons.push(coupon);
		}else if(coupon.AssociationStatus == cancelledStatus){
			paymentItems.Vouchers.push(coupon);
		}
	});

	return paymentItems;

}

export default prepareWalletPaymentItems;