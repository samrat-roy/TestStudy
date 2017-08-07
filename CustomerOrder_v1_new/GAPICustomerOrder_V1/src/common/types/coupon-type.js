import Enum from 'enum';
const CouponType = new Enum({
	'CouponDescriptorEntity':'ECoupon',
	'VoucherDescriptorEntity':'Voucher'
});
export default CouponType;