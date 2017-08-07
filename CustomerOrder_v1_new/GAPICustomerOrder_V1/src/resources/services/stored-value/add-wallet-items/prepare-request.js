function getPaymentItem(code, type, basketId, ean = null){
	return {
		'Code' : code,
		'CodeType' : type,
		'ReservationID' : basketId,
		'VoucherEAN' : ean
	};
}

export default function preparePayLoadRequest(paymentItems,basketId){

	let payloadRequest = [];

	if(paymentItems.SmartCoupons.length){
		payloadRequest = payloadRequest.concat(paymentItems.SmartCoupons.map(item => {
			return getPaymentItem(item.Id, 'SmartCoupon', basketId);
		}));
	}

	if(paymentItems.ECoupons.length){
		payloadRequest = payloadRequest.concat(paymentItems.ECoupons.map(item => {
			return getPaymentItem(item.Id, 'ECoupon', basketId);
		}));
	}

	if(paymentItems.Vouchers.length){
		payloadRequest = payloadRequest.concat(paymentItems.Vouchers.map(item => {
			return getPaymentItem(item.Id, 'ClubCardVoucher', basketId, item.Ean);
		}));
	}

	return payloadRequest;
}

