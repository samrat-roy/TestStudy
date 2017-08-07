import config from '../../../../../config';
import moment from 'moment';
import orderEntity from '../../../../../common/types';


function mapBasketToOrder(basket) {

	let order = orderEntity.getOrderAttributes();

	if (basket.BasketHeader && basket.BasketHeader[0] && basket.BasketHeader[0].$ && basket.BasketHeader[0].DeliveryDetails[0] && basket.BasketHeader[0].DeliveryDetails[0].$) {
		order.Header = mapOrderHeader(basket.BasketHeader[0].$);
	} else return null;

	order.Delivery = mapOrderDelivery(basket.BasketHeader[0]);
	let basketItems = basket.GroceryBasketItems;

	if (basketItems && basketItems[0] && basketItems[0].GroceryBasketItemEntity) {
		order.LineItems = mapOrderLineItems(basketItems[0].GroceryBasketItemEntity);
	}

	order.Price = mapOrderprice(basket, order.LineItems);
	order.Discounts = mapOrderDiscounts(basket);
	return order;
}

function mapOrderprice(basket, lineItems) {
	let price = orderEntity.getPriceAttributes();
	price.RetailPrice = basket.BasketHeader[0].$.GuidePrice;
	let surchargeProduct = lineItems && lineItems.find(item => {
		return item.ProductId == config.SurchargeProductId;
	});

	if (surchargeProduct) {
		price.Surcharge = surchargeProduct.InStoreTotalPrice;
	}

	return price;
}

function mapOrderDelivery(basketHeader) {
	let deliveryInfo = basketHeader.DeliveryDetails[0].$;
	let delivery = orderEntity.getDeliveryAttributes();	
	delivery.Addresses = mapAddresses(deliveryInfo);
	delivery.WithBag = basketHeader.DeliveryDetails[0].IsBaglessDelivery[0] ? false : true;	
	delivery.Charges = mapCharges(deliveryInfo.DeliveryCharge, delivery.WithBag);
	delivery.IsActiveSlotType = true;
	delivery.IsGreen = deliveryInfo.IsGreenDelivery ? true : false;
	delivery.Notes = deliveryInfo.DeliveryNotes;
	delivery.Option = orderEntity.DeliveryType.getKey(deliveryInfo.DeliveryOptionID);
	delivery.ReservationId = deliveryInfo.ReservationID;
	delivery.SlotCutoffDateTime = deliveryInfo.DeliverySlotExpiryDateTime;
	delivery.SlotEndDateTime = deliveryInfo.DeliverySlotEnd;
	delivery.SlotStartDateTime = deliveryInfo.DeliverySlotStart;
	delivery.SlotId = deliveryInfo.DeliverySlotID;
	delivery.SlotReservationExpiryDateTime = deliveryInfo.DeliverySlotReservationExpires;
	delivery.SlotState = orderEntity.DeliverySlotStatus.getKey(deliveryInfo.DeliverySlotStatus);
	delivery.StoreId = basketHeader.$.BranchID;
	let location = orderEntity.getLocationAttributes();
	location.Id = basketHeader.$.DeliveryLocationId.toString();
	delivery.Location = location;
	delivery.SlotType = getSlotType(delivery.slotState, delivery.SlotStartDateTime, delivery.SlotEndDateTime);
	return [delivery];
}

function mapAddresses(deliveryInfo){
	let addresses = orderEntity.getAddressesAttributes();
	let deliveryAddress = orderEntity.getAddressAttributes();
	deliveryAddress.MartiniAddressId = deliveryInfo.DeliveryAddressID;
	deliveryAddress.PostCode = deliveryInfo.DeliveryPostalCode.trim();
	addresses.DeliveryAddress = deliveryAddress;
	return addresses;
}

function mapCharges(deliveryCharge, bagOption){
	let charges = orderEntity.getChargesAttributes();
	charges.DeliveryCharge.Amount = deliveryCharge;
	charges.BagCharge = orderEntity.getBagChargeAttributes();
	charges.BagCharge.IsApplied = bagOption;
	return charges;
}

function mapOrderHeader(headerDetails) {
	let headerEntity = orderEntity.getHeaderAttributes();
	headerEntity.ContractID = headerDetails.AmendModeContractID.toString();
	headerEntity.Id = headerDetails.BasketID;
	headerEntity.MartiniOrderId = headerDetails.OrderID;
	headerEntity.Name = headerDetails.Name;
	headerEntity.LastModifiedDateTime = headerDetails.LastUpdate;
	headerEntity.Version = headerDetails.ContractAmendmentVersionID ? headerDetails.ContractAmendmentVersionID : headerEntity.Version;
	headerEntity.Status = headerDetails.IsBeingAmended ? orderEntity.OrderStatus.getValue('InAmendment') : headerDetails.IsActive ? orderEntity.OrderStatus.getValue('Open') : orderEntity.OrderStatus.getValue('PendingBasket');
	return headerEntity;
}

function mapOrderLineItems(basketItemList) {
	let orderbasketItems = [];
	for (let count = 0, len = basketItemList.length; count < len; count++) {
		if (basketItemList[count].$) {
			let basketItem = basketItemList[count].$;
			let lineitem = orderEntity.getLineItemAttributes();
			lineitem.AddedDateTime = basketItem.AddedDateTime;
			lineitem.AverageWeight = basketItem.ProductAverageWeight;
			lineitem.BaseProductId = basketItem.BaseProductID.toString();
			lineitem.ChargeProductType = basketItem.ChargeProductType ? orderEntity.ChargeProductType.getKey(1) : orderEntity.ChargeProductType.getKey(1);
			lineitem.ChoiceQuantity = basketItem.ChoiceQty;
			lineitem.ChoiceWeight = basketItem.ChoiceWeight;
			lineitem.Description = basketItem.ProductDescription;
			lineitem.InStorePrice = basketItem.ProductInStorePrice;
			lineitem.InStoreQuantity = basketItem.ProductInStoreQuantity;
			lineitem.InStoreTotalPrice = basketItem.ProductInStoreTotalPrice;
			lineitem.IsNewlyAdded = basketItem.IsNewlyAdded ? true : false;
			lineitem.IsSelectedByQuantity = basketItem.IsSelectedByQuantity ? true : false;
			lineitem.LastUpdated = basketItem.UpdatedDateTime;
			lineitem.MaxWeight = basketItem.ProductMaxWeight;
			lineitem.MeasureType = orderEntity.MeasureType.getKey(basketItem.ProductMeasureType);
			lineitem.ProductId = basketItem.ProductID.toString();
			lineitem.QuantityOriginal = basketItem.ChoiceQtyOriginal;
			lineitem.Type = orderEntity.ProductType.getKey(basketItem.ProductType);
			lineitem.UnitOfSale = orderEntity.UnitOfSaleType.getKey(basketItem.UnitOfSale);
			lineitem.Volume = basketItem.ProductVolume;
			lineitem.Weight = basketItem.ProductWeight;
			lineitem.WeightOriginal = basketItem.ChoiceWeightOriginal;
			orderbasketItems[count] = lineitem;
		}
	}
	return orderbasketItems.length > 0 ? orderbasketItems : null;
}

function mapRewards(basketRewards) {
	if (basketRewards && basketRewards[0] && basketRewards[0].RewardEntity) {
		const getRewards = reward => {
			let basketReward = reward.$;
			let rewardEntity = orderEntity.getRewardAttributes();
			rewardEntity.PromotionId = basketReward.PromotionId;
			rewardEntity.RewardValue = basketReward.Amount;
			rewardEntity.RewardType = orderEntity.RewardType.getKey(basketReward.RewardType);
			return rewardEntity;
		};
		return basketRewards[0].RewardEntity.map(getRewards);
	}

	return null;
}


function mapOrderDiscounts(basket) {
	let discounts = orderEntity.getDiscountsAttributes();
	discounts.Rewards = mapRewards(basket.Rewards);
	if (basket.BasketHeader[0].PaymentItems && basket.BasketHeader[0].PaymentItems[0].PaymentItemEntity) {
		discounts.Coupons = mapCoupons(basket.BasketHeader[0].PaymentItems[0].PaymentItemEntity, basket.BasketHeader[0].$.IsBeingAmended);
	}
	return discounts;
}

function mapCoupons(paymentItems, isInAmend) {
//	let couponAssociationStatus = isInAmend ? orderEntity.CouponAssociationStatus.getKey(2) : orderEntity.CouponAssociationStatus.getKey(1);
	let eCoupon = orderEntity.CouponType.getValue('CouponDescriptorEntity');
	let voucher = orderEntity.CouponType.getValue('VoucherDescriptorEntity');
	return paymentItems.map(item => {
		let coupon = orderEntity.getCouponAttributes();
		coupon = mapCoupon(item, coupon);
//		coupon.AssociationStatus = couponAssociationStatus;
		if (item.$['xsi:type'] == 'CouponDescriptorEntity') {
			coupon.Id = item.$.CouponID;
			coupon.Type = eCoupon;
			coupon.Category = orderEntity.CouponRewardType.getValue(item.RewardType);
		} else {
			coupon.Id = item.$.VoucherID;
			coupon.Type = voucher;
		}
		return coupon;
	});
}

function mapCoupon(paymentItem, coupon) {
	let item = paymentItem.$;
	coupon.Value = item.RewardValue;
	coupon.CampaignId = item.CampaignID;
	coupon.Description = item.Description;
	coupon.Ean = item.Ean;
	coupon.ExpiryDate = item.ExpiryDate;
	coupon.MasterCampaignId = item.MasterCampaignID;
	coupon.Name = item.Name;
	coupon.StartDate = item.StartDate;
	return coupon;
}

function getSlotType(slotState, startDate, endDate) {
	let slotType = null;

	if (slotState != orderEntity.DeliverySlotStatus.getKey(3)) {
		slotType = moment(endDate).diff(moment(startDate), 'hours', true);
	}

	return slotType;
}

export default mapBasketToOrder;
