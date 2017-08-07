import { CouponAssociationStatus } from '../../../common/types';
import map from 'lodash/map';
import { OrderStatus } from '../../../common/types';
import prepareWalletPaymentItems from './prepare-wallet-items';
import repository from '../../../resolver/repository';
import validator from './validate';

async function cancelPaymentItems(order, paymentItems, clubCardNumber, context) {
	let coupons = await repository.restoreCoupons(context, paymentItems, clubCardNumber, order.Header.ContractID);
	let smartCouponsToBeRemoved = coupons.filter(coupon => {
		return validator.isSmartCoupon(coupon.Id);
	});
	repository.removeUnusedSmartCoupons(context, map(smartCouponsToBeRemoved, 'Id'), order.Header.MartiniOrderId, order.Delivery[0].StoreId);

	/* Existing GAPI customerorder executes payment.VoucherUsageUndo SP for each coupon which is free collect and mastercoupon id is not null. This step is not done here.*/

	let walletItems = prepareWalletPaymentItems(coupons);
	repository.addWalletItems(context, map(walletItems, 'Id'), null);

	if (order.Header.Status == OrderStatus.getValue('InAmendment')) {
		let isDeleted = await repository.deleteWalletItems(context, map(walletItems, 'Id'), null);
	}

	repository.addWalletItems(context, walletItems, null);
	return coupons;
}



export default cancelPaymentItems;