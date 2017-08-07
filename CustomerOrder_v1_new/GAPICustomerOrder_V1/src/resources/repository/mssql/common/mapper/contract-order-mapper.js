import orderEntity from '../../../../../common/types';
import config from '../../../../../config';

function mapContractToOrder(contract) {
	let order = orderEntity.getOrderAttributes();
	let header = contract.ContractEntity.ContractHeader[0];
	order.Header = mapOrderHeader(header);
	order.LineItems = mapOrderLineItems(contract.ContractEntity.GroceryBasketItemEntities[0].GroceryBasketItemEntity);
	order.Discounts = mapOrderDiscounts(header);
	order.Customer = mapOrderCustomerDetails(header);
	order.Payment = mapOrderPayment(header.PaymentBasketEntity[0].PaymentCardDetails[0].PaymentCardDetailsEntity[0]);
	order.Delivery = mapOrderDelivery(header);
	order.Price = mapOrderPrice(header, order.LineItems);
	return order;
}

function mapOrderPrice(header, lineItems) {
	let price = orderEntity.getPriceAttributes();
	price.RetailPrice = header.PaymentBasketEntity[0].PaymentSummary[0].$.GuidePrice;
	let surchargeProduct = lineItems && lineItems.find(item => {
		return item.ProductId == config.SurchargeProductId;
	});

	if (surchargeProduct) {
		price.Surcharge = surchargeProduct.InStoreTotalPrice;
	}

	return price;
}

function mapOrderDelivery(header) {
	let delivery = orderEntity.getDeliveryAttributes();
	let deliveryInfo = header.DeliverySlot[0].$;
	delivery.IsActiveSlotType = deliveryInfo.IsActiveSlotType == 'true';
	delivery.IsGreen = deliveryInfo.IsGreenDelivery == 'false' ? false : true;
	delivery.Addresses = mapAddresses(header);
	delivery.Notes = header.DeliveryInstructions[0].Instructions[0];
	delivery.Option = deliveryInfo.DeliveryOption;
	delivery.ReservationId = deliveryInfo.ReservationId;
	delivery.SlotCutoffDateTime = deliveryInfo.CutoffDateTime;
	delivery.SlotEndDateTime = deliveryInfo.EndDateTime;
	delivery.SlotId = deliveryInfo.DeliverySlotId;
	delivery.SlotStartDateTime = deliveryInfo.StartDateTime;
	delivery.SlotState = orderEntity.DeliverySlotStatus.getKey(2);
	delivery.SlotType = deliveryInfo.SlotType;
	delivery.StoreId = header.$.StoreId;
	delivery.WithBag = header.DeliverySlot[0].IsBaglessDelivery[0] ? false : true;
	delivery.Charges = mapCharges(header.PaymentBasketEntity[0].PaymentSummary[0], delivery.WithBag);
	delivery.Location = orderEntity.getLocationAttributes();
	delivery.Location.Id = header.$.DeliveryLocationId;
	return [delivery];
}

function mapCharges(paymentInfo, isBagChosen){

	let charges = orderEntity.getChargesAttributes();
	charges.DeliveryCharge.Amount = paymentInfo.$.DeliveryCharge;

	if(paymentInfo.Charges && paymentInfo.Charges[0] && paymentInfo.Charges[0].Charge){
		let bagCharge = paymentInfo.Charges[0].Charge.find(item => {
			return item.$.ChargeDescription == 'Bag Charge';
		});

		if(bagCharge){
			const orderBagCharge = orderEntity.getBagChargeAttributes();
			orderBagCharge.Amount = bagCharge.$.Amount;
			orderBagCharge.HelpURL = bagCharge.$.HelpURL;
			orderBagCharge.IsApplied = isBagChosen;
			charges.BagCharge = orderBagCharge;
		}
	}

	return charges;
}

function mapAddresses(header) {
	let addresses = orderEntity.getAddressesAttributes();
	let contact = orderEntity.getContactAttributes(); // Need To Confirm whether recipients phone mapping is correct
	contact.PhoneDay = header.Recipient[0].$.PhoneDay ? header.Recipient[0].$.PhoneDay.toString() : null;
	contact.PhoneEvening = header.Recipient[0].$.PhoneEvening ? header.Recipient[0].$.PhoneEvening.toString() : null;
	contact.PhoneMobile = header.Recipient[0].$.PhoneMobile ? header.Recipient[0].$.PhoneMobile : null;
	addresses.DeliveryAddress = mapAddress(header.DeliveryAddress[0].$, contact);
	addresses.BillingAddress = mapAddress(header.PaymentBasketEntity[0].PaymentCardDetails[0].PaymentCardDetailsEntity[0].BillingAddress[0].$, contact);
	return addresses;
}

function mapAddress(contractAddress, contactDetails) {
	let address = orderEntity.getAddressAttributes();
	address.BuildingNameNumber = contractAddress.BuildingNameNumber;
	address.BuildingType = contractAddress.BuildingType;
	address.OrganisationName = contractAddress.OrganisationName;
	address.DxshAddressNo = contractAddress.DxshAddressNo;
	address.GridReference = contractAddress.GridReference;
	address.LegacyAddressString = contractAddress.LegacyAddressString;
	address.Locality = contractAddress.Locality;
	address.MartiniAddressId = contractAddress.MartiniAddressId;
	address.Nickname = contractAddress.Nickname;
	address.PafValidated = contractAddress.PafValidated == 'false' ? false : true;
	address.PostalTown = contractAddress.PostalTown;
	address.Postcode = contractAddress.Postcode;
	address.StreetName = contractAddress.StreetName;
	address.SubBuildingNumber = contractAddress.SubBuildingNumber;
	address.Contact = contactDetails;
	return address;
}

function mapOrderPayment(paymentCard) {
	let payment = orderEntity.getPaymentAttributes();
	let paymentInfo = paymentCard.$;
	payment.CardDetails.AuthorisationCode = paymentInfo.AuthorisationCode;
	payment.CardDetails.CardAuthentAtsd = paymentInfo.CardAuthentAtsd;
	payment.CardDetails.CardAuthentEci = paymentInfo.CardAuthentEci;
	payment.CardDetails.CardAuthentPares = paymentInfo.CardAuthentPares;
	payment.CardDetails.CardAuthentPosem = paymentInfo.CardAuthentPosem;
	payment.CardDetails.CardAuthentXid = paymentInfo.CardAuthentXid;
	payment.CardDetails.CardholderName = paymentInfo.CardholderName;
	payment.CardDetails.CardNumber = paymentInfo.CardNumber;
	payment.CardDetails.CardType = paymentInfo.CardType;
	payment.CardDetails.ExpiryDate = paymentInfo.ExpiryDate;
	payment.CardDetails.IssueNumber = paymentInfo.IssueNumber;
	payment.CardDetails.Last4digit = paymentInfo.Last4Digits;
	payment.CardDetails.StartDate = paymentInfo.StartDate;
	return payment;
}

function mapOrderHeader(contractHeader) {
	let header = orderEntity.getHeaderAttributes();
	let headerInfo = contractHeader.$;
	header.ContractID = headerInfo.ContractID.toString();
	header.CreatedDateTime = headerInfo.CreatedDate;
	header.Id = 0;
	header.IsContractLegacy = headerInfo.IsContractLegacy == 'false' ? false : true;
	header.LastModifiedDateTime = headerInfo.ModifiedDateTime;
	header.MartiniOrderId = headerInfo.CustomerRefNumber;
	header.Name = headerInfo.BasketName;
	header.Status = orderEntity.OrderStatus.getValue(contractHeader.ContractStatus[0]);
	return header;
}

function mapOrderLineItems(contractLineItems) {
	return contractLineItems.map((item) => {
		let lineItem = orderEntity.getLineItemAttributes();
		let itemInfo = item.$;
		lineItem.AddedDateTime = itemInfo.AddedDateTime;
		lineItem.AverageWeight = itemInfo.ProductAgerageWeight;
		lineItem.BaseProductId = itemInfo.BaseProductId.toString();
		lineItem.ChargeProductType = itemInfo.ChargeProductType;
		lineItem.ChoiceQuantity = itemInfo.ChoiceQuantity;
		lineItem.ChoiceWeight = itemInfo.ChoiceWeight;
		lineItem.Description = itemInfo.ProductDescription;
		lineItem.InStorePrice = itemInfo.ProductInStorePrice;
		lineItem.InStoreQuantity = itemInfo.ProductInStoreQuantity;
		lineItem.InStoreTotalPrice = itemInfo.ProductInStoreTotalPrice;
		lineItem.IsSelectedByQuantity = itemInfo.IsSelectedByQuantity == 'true';
		lineItem.LastUpdated = itemInfo.LastUpdated;
		lineItem.MaxWeight = itemInfo.ProductMaxWeight;
		lineItem.MeasureType = item.MeasureType[0];
		lineItem.ProductId = itemInfo.ProductId.toString();
		lineItem.SubstitutionOption = item.SubstitutionOption[0];
		lineItem.PickerNote = itemInfo.PickNote;
		lineItem.Type = item.ProductType[0];
		lineItem.UnitOfSale = item.UnitOfSale[0];
		lineItem.Volume = itemInfo.ProductVolume;
		lineItem.Weight = itemInfo.ProductWeight;
		return lineItem;
		// not mapped linenumber, original quantity-weight        
	});
}

function mapOrderDiscounts(header) {
	let discount = orderEntity.getDiscountsAttributes();
	let paymentSummaryInfo = header.PaymentBasketEntity[0].PaymentSummary[0].$;
	discount.StaffDiscount = paymentSummaryInfo.StaffDiscount;
	discount.StandardClubCardPoints = paymentSummaryInfo.StandardClubCardPoints;
	discount.PromotionalClubCardPoints = paymentSummaryInfo.PromotionalClubCardPoints;
	discount.TotalGreenClubCardPoints = paymentSummaryInfo.TotalGreenClubCardPoints;
	discount.TotalCoupons = paymentSummaryInfo.TotalCoupons;
	discount.TotalGiftCards = paymentSummaryInfo.TotalGiftCards;
	discount.TotalVouchers = paymentSummaryInfo.TotalVouchers;
	discount.TotalSavings = paymentSummaryInfo.TotalSavings;
	discount.Coupons = mapCoupons(header.PaymentBasketEntity[0]);
	discount.Rewards = mapRewards(header.Rewards[0]);
	return discount;
}

function mapCoupons(paymentItems) {
	let result = [];
	if (paymentItems.Coupon[0]) {
		let coupons = [];
		let couponType = orderEntity.CouponType.getValue('CouponDescriptorEntity');
		let couponItems = paymentItems.Coupon[0].CouponEntity;
		coupons = couponItems.map(item => {
			let coupon = orderEntity.getCouponAttributes();
			coupon = mapCoupon(item, coupon);
			coupon.Id = item.$.CouponId;
			coupon.Type = couponType;
			coupon.Value = item.$.RewardValue;
			coupon.Category = item.RewardType[0];
			return coupon;
		});
		result = result.concat(coupons);
	}
	if (paymentItems.Voucher[0]) {
		let vouchers = [];
		let couponType = orderEntity.CouponType.getValue('VoucherDescriptorEntity');
		let voucherItems = paymentItems.Voucher[0].VoucherEntity;
		vouchers = voucherItems.map(item => {
			let coupon = orderEntity.getCouponAttributes();
			coupon = mapCoupon(item, coupon);
			coupon.Type = couponType;
			coupon.Value = item.$.VoucherValue;
			coupon.Id = item.$.VoucherId;
			return coupon;
		});
		result = result.concat(vouchers);
	}
	return result;
}

function mapCoupon(item, coupon) {
	coupon.CampaignId = item.$.CampaignId;
	coupon.AssociationStatus = orderEntity.CouponAssociationStatus.getKey(2);
	coupon.Description = item.$.Description;
	coupon.Ean = item.$.Ean;
	coupon.ExpiryDate = item.$.ExpiryDate;
	coupon.MasterCampaignId = item.$.MasterCampaignId;
	coupon.Name = item.$.Name;
	coupon.StartDate = item.$.StartDate;
	return coupon;
}

function mapRewards(rewards) {
	if (rewards) {
		let rewardItems = rewards.Reward;
		return rewardItems.map(item => {
			let reward = orderEntity.getRewardAttributes();
			reward.PromotionId = item.$.PromotionId;
			reward.RewardValue = item.$.Amount;
			reward.RewardType = item.$.RewardType;
			return reward;
		});
	}
	return null;
}

function mapOrderCustomerDetails(header) {
	let customer = orderEntity.getCustomerAttributes();
	let custInfo = header.CustomerDetails[0];
	let recipientInfo = header.Recipient[0].$;
	customer.Id = custInfo.CustomerId[0];
	customer.DxshId = custInfo.DxshCustomerId[0];
	customer.Title = recipientInfo.Title;
	customer.Initials = recipientInfo.Initials;
	customer.Forename = recipientInfo.Forename;
	customer.Surname = recipientInfo.Surname;
	customer.Email = recipientInfo.Email;
	customer.ClubcardNumber = custInfo.ClubcardNumber[0];
	// Dont have details to map isStaffMember
	return customer;
}

exports.mapContractToOrder = mapContractToOrder;
exports.mapOrderHeader = mapOrderHeader;
exports.mapOrderLineItems = mapOrderLineItems;
exports.mapOrderCustomerDetails = mapOrderCustomerDetails;
exports.mapOrderDiscounts = mapOrderDiscounts;
exports.mapOrderDelivery = mapOrderDelivery;
exports.mapOrderPrice = mapOrderPrice;
exports.mapOrderPayment = mapOrderPayment;