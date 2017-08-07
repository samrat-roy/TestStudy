import Address from './address';
import Addresses from './addresses';
import BagCharge from './bag-charge';
import BuildingType from './building-type';
import ChargeProductType from './charge-product-type';
import Charges from './charges';
import Contact from './contact';
import Coupon from './coupon';
import CouponAssociationStatus from './coupon-association-status';
import CouponType from './coupon-type';
import CouponRewardType from './coupon-reward-type';
import Customer from './customer';
import Delivery from './delivery';
import DeliverySlotStatus from './delivery-slot-status';
import DeliveryType from './delivery-type';
import Discounts from './discounts';
import Header from './header';
import LineItem from './lineitem';
import Location from './location';
import MeasureType from './measure-type';
import NotificationType from './notification-type';
import Order from './order';
import OrderStatus from './order-status';
import Payment from './payment';
import Preference from './preference';
import ProductType from './product-type';
import Price from './price';
import Reward from './reward';
import RewardType from './reward-type';
import SubstitutionOption from './substitution-options';
import UnitOfSaleType from './unit-of-sale-type';


function getAddressAttributes(){
	return Object.assign({}, Address);
}
function getAddressesAttributes(){
	return Object.assign({}, Addresses);
}
function getBagChargeAttributes(){
	return Object.assign({}, BagCharge);
}
function getChargesAttributes(){
	return Object.assign({}, Charges);
}
function getCouponAttributes() {
	return Object.assign({}, Coupon);
}
function getContactAttributes(){
	return Object.assign({}, Contact);
}
function getCustomerAttributes(){
	return Object.assign({}, Customer);
}
function getDeliveryAttributes(){
	return Object.assign({}, Delivery);
}
function getDiscountsAttributes() {
	return Object.assign({}, Discounts);
}
function getHeaderAttributes() {
	return Object.assign({}, Header);
}
function getLineItemAttributes() {
	return Object.assign({}, LineItem);
}
function getLocationAttributes(){
	return Object.assign({}, Location);
}
function getOrderAttributes() {
	return Object.assign({}, Order);
}
function getRewardAttributes() {
	return Object.assign({}, Reward);
}
function getPreferenceAttributes() {
	return Object.assign({}, Preference);
}
function getPaymentAttributes(){
	return Object.assign({}, Payment);
}
function getPriceAttributes(){
	return Object.assign({}, Price);
}
module.exports =  {
	BuildingType,
	ChargeProductType,
	CouponType,
	CouponAssociationStatus,
	CouponRewardType,
	DeliverySlotStatus,	
	DeliveryType,	
	getAddressAttributes,
	getAddressesAttributes,
	getBagChargeAttributes,
	getChargesAttributes,
	getContactAttributes,
	getCouponAttributes,
	getCustomerAttributes,
	getDeliveryAttributes,
	getDiscountsAttributes,
	getHeaderAttributes,
	getLineItemAttributes,
	getLocationAttributes,
	getOrderAttributes,
	getPaymentAttributes,
	getPreferenceAttributes,
	getRewardAttributes,
	getPriceAttributes,
	MeasureType,
	NotificationType,
	OrderStatus,
	ProductType,
	RewardType,
	SubstitutionOption,
	UnitOfSaleType
};
