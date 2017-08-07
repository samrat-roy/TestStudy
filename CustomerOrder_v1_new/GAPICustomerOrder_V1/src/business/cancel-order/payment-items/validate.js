function isSmartCoupon(couponCode){
	return /^(GC|XC)/i.test(couponCode);
}

module.exports = {
	isSmartCoupon
};