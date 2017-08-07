import orderEntity from '../../../../common/types';

function mapCouponsByStatus(storedValueCollection, coupons, statusToBeMapped) {

	coupons.forEach(coupon => {
		let storedValueCoupon = storedValueCollection.find(item => {
			return item.Code.trim() == coupon.Id;
		});
		coupon.AssociationStatus = storedValueCoupon ?
			storedValueCoupon.RedemptionStatus == 'SUCCESSFUL' ?
				statusToBeMapped : coupon.AssociationStatus
			: coupon.AssociationStatus;
	});

	return coupons;
}

export default mapCouponsByStatus;