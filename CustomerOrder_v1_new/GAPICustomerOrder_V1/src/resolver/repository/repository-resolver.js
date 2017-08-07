import config from '../../config';
import repository from '../../resources/repository/';
import services from '../../resources/services/';

exports.addWalletItems = (context, paymentItems, basketId=null) => {
	switch (config.source.addwalletitems) {
	case 'inmemory' : return services.localService.addWalletItems(context, paymentItems, basketId);
	case 'storedvalue': return services.storedValueService.addWalletItems(context, paymentItems, basketId);
	default: return services.storedValueService.addWalletItems(context, paymentItems, basketId);
	}
};

exports.applyCoupons = (context, coupons, clubcardNumber, contractId) => {
	switch(config.source.applycoupons){
	case 'storedvalue' : return services.storedValueService.applyCoupons(context, coupons, clubcardNumber, contractId);
	default : return services.storedValueService.applyCoupons(context, coupons, clubcardNumber, contractId);
	}
};

exports.cancelCollectionSlot = (context, orderId, storeId, slotStartTime, slotEndTime) => {
	switch (config.source.cancelcollectionslot) {
	case 'inmemory' : return services.localService.cancelCollectionSlot(context, orderId, storeId, slotStartTime, slotEndTime);
	case 'transport': return services.transportService.cancelCollectionSlot(context, orderId, storeId, slotStartTime, slotEndTime);
	default: return services.transportService.cancelCollectionSlot(context, orderId, storeId, slotStartTime, slotEndTime);
	}
};

exports.cancelContract = (context, contractId) => {
	switch (config.source.cancelcontract) {
	case 'inmemory' : return services.localService.cancelContract(context, contractId);
	case 'martini': return services.martiniService.cancelContractById(contractId, context.customerId);
	default: return services.martiniService.cancelContractById(contractId, context.customerId);
	}
};

exports.cancelDeliverySlot = (context, orderId, storeId, reservationId) => {
	switch (config.source.canceldeliveryslot) {
	case 'inmemory' : return services.localService.cancelDeliverySlot(context, orderId, storeId, reservationId);
	case 'transport': return services.transportService.cancelDeliverySlot(context, orderId, storeId, reservationId);
	default: return services.transportService.cancelDeliverySlot(context, orderId, storeId, reservationId);
	}
};

exports.deleteWalletItems = (context, couponCodes, reservationId) => {
	switch (config.source.deletewalletitems) {
	case 'storedvalue': return services.storedValueService.deleteWalletItems(context, couponCodes, reservationId);
	default: return services.storedValueService.deleteWalletItems(context, couponCodes, reservationId);
	}
};

exports.getAddresses = (context, adressIdList) => {
	switch (config.source.getaddresses) {
	case 'inmemory': return services.localService.getAddresses(context, adressIdList);
	case 'grocerypreference': return services.groceryPreferenceService.getAddresses(context, adressIdList);
	default: return services.groceryPreferenceService.getAddresses(context, adressIdList);
	}
};

exports.getBaskets = (context) => {
	switch (config.source.getbaskets) {
	case 'inmemory': return repository.localRepository.getBaskets(context);
	case 'mssql': return repository.sqlRepository.getBaskets(context);
	default: return repository.sqlRepository.getBaskets(context);
	}
};

exports.getCollectionAddresses = (context, locationIdList) => {
	switch (config.source.getcollectionaddress) {
	case 'inmemory': return services.localService.getCollectionAddresses(context, locationIdList);
	case 'tescolocation': return services.tescoLocationService.getCollectionAddresses(context, locationIdList);
	default: return services.tescoLocationService.getCollectionAddresses(context, locationIdList);
	}
};

exports.getContract = (contractId, context) => {
	switch (config.source.getorderdetails) {
	case 'inmemory': return repository.localRepository.getContract(contractId, context);
	case 'mssql': return repository.sqlRepository.getContract(contractId, context);
	default: return repository.sqlRepository.getContract(contractId, context);
	}
};

exports.getContractHeaders = (context, contractIds) => {
	switch (config.source.getcontractheaders) {
	case 'inmemory': return repository.localRepository.getContractHeaders(context, contractIds);
	case 'mssql': return repository.sqlRepository.getContractHeaders(context, contractIds);
	default: return repository.sqlRepository.getContractHeaders(context, contractIds);
	}
};

exports.getContractId = (orderId, storeId, context) => {
	switch (config.source.getcontractid) {
	case 'inmemory': return repository.localRepository.getContractId(orderId, storeId, context);
	case 'mssql': return repository.sqlRepository.getContractId(orderId, storeId, context);
	default: return repository.sqlRepository.getContractId(orderId, storeId, context);
	}
};

exports.getGlobalSubstitutionDetails = (context) => {
	switch (config.source.getglobalsubstitutiondetails) {
	case 'inmemory': return services.localService.getGlobalSubstitutionDetails(context);
	case 'grocerypreference': return services.groceryPreferenceService.getGlobalSubstitutionDetails(context);
	default: return services.groceryPreferenceService.getGlobalSubstitutionDetails(context);
	}
};

exports.getOrderDiffdetails = (contractId, context) => {
	switch (config.source.getorderdiff) {
	case 'inmemory': return repository.localRepository.getOrderDiff(contractId, context);
	case 'mssql': return repository.sqlRepository.getOrderDiff(contractId, context);
	default: return repository.sqlRepository.getOrderDiff(contractId, context);
	}
};

exports.getOrders = (context, dxshCustomerId) => {
	switch (config.source.getordersummary) {
	case 'inmemory': return repository.localRepository.getOrders(context, dxshCustomerId);
	case 'mssql': return repository.sqlRepository.getOrders(dxshCustomerId);
	default: return repository.sqlRepository.getOrders(dxshCustomerId);
	}
};

exports.getPersonalDetails = (context, order) => {
	switch (config.source.getpersonaldetails) {
	case 'inmemory': return services.localService.getPersonalInfo(context, order);
	case 'grocerypreference': return services.groceryPreferenceService.getPersonalInfo(context);
	default: return services.groceryPreferenceService.getPersonalInfo(context, order);
	}
};

exports.getPostCodesBagCharges = (context, postCodes) => {
	switch (config.source.getpostcodesbagcharges) {
	case 'inmemory': return repository.localRepository.getPostCodesBagCharges(context, postCodes);
	case 'mssql': return repository.sqlRepository.getPostCodesBagCharges(postCodes);
	default: return repository.sqlRepository.getPostCodesBagCharges(postCodes);
	}
};

exports.getSubstitutionDetails = (context, basketIds) => {
	switch (config.source.getsubstitutiondetails) {
	case 'inmemory': return repository.localRepository.getSubstitutionDetails(context, basketIds);
	case 'mssql': return repository.sqlRepository.getSubstitutionDetails(context, basketIds);
	default: return repository.sqlRepository.getSubstitutionDetails(context, basketIds);
	}
};

exports.restoreCoupons = (context, coupons, clubcardNumber, contractId) => {
	switch(config.source.restorecoupons){
	case 'inmemory' : return services.localService.restoreCoupons(context, coupons, clubcardNumber, contractId);
	case 'storedvalue' : return services.storedValueService.restoreCoupons(context, coupons, clubcardNumber, contractId);
	default : return services.storedValueService.restoreCoupons(context, coupons, clubcardNumber, contractId);
	}
};

exports.removeUnusedSmartCoupons = (context, couponIds, orderId, storeId ) => {
	switch(config.source.removeUnusedSmartCoupons){
	case 'inmemory' : return repository.localRepository.removeUnusedSmartCoupons(couponIds, orderId, storeId );
	case 'mssql' : return repository.sqlRepository.removeUnusedSmartCoupons(couponIds, orderId, storeId );
	default  : return repository.sqlRepository.removeUnusedSmartCoupons(couponIds, orderId, storeId );
	}
};

exports.saveContractOrderMapping = (contractId, orderId, storeId, orderStatusId, customerId, martiniAddressId = null, dxshAddressId =null, orderAmendExpiryTime=null, isNasaEnabled=false) => {
	switch(config.source.savecontractordermapping){
	case 'mssql': return repository.sqlRepository.saveContractOrderMapping(contractId, orderId, storeId, orderStatusId, martiniAddressId, dxshAddressId, orderAmendExpiryTime, isNasaEnabled, customerId);
	default : return repository.sqlRepository.saveContractOrderMapping(contractId, orderId, storeId, orderStatusId, martiniAddressId, dxshAddressId, orderAmendExpiryTime, isNasaEnabled, customerId);
	}
};

exports.saveLineItems = (orderId, storeId, baseproductId, quantity, orderUnit, formattedPickerNotes, substitutionRule, linePrice, substitutionNotes, isUpdateOrder = 0, orderItems = 0, orderLines = 0 ) => {
	switch(config.source.savelineitems){
	case 'mssql' : return repository.sqlRepository.saveLineItems(orderId, storeId, baseproductId, quantity, orderUnit, formattedPickerNotes, substitutionRule,isUpdateOrder, orderItems, orderLines, linePrice, substitutionNotes);
	default : return repository.sqlRepository.saveLineItems(orderId, storeId, baseproductId, quantity, orderUnit, formattedPickerNotes, substitutionRule,isUpdateOrder, orderItems, orderLines, linePrice, substitutionNotes);
	}
};

exports.saveUsedVouchers = (context, orderId, storeId, expiryDate, ean, value, voucherId, reservedDate, paymentSubTypeId=1, stan=null, paymentStatusID=2, existingPaymentId=null) => {
	switch(config.source.saveusedvouchers){
	case 'mssql' : return repository.sqlRepository.saveUsedVouchers(context, orderId, storeId, paymentSubTypeId, expiryDate, stan, paymentStatusID, ean, value, voucherId, reservedDate, existingPaymentId);
	default : return repository.sqlRepository.saveUsedVouchers(context, orderId, storeId, paymentSubTypeId, expiryDate, stan, paymentStatusID, ean, value, voucherId, reservedDate, existingPaymentId);
	}
};

exports.sendNotification = (context, notification) => {
	switch(config.source.sendnotification){
	case 'inmemory' : return services.localService.sendNotification(notification);
	case 'martini' : return services.martiniService.sendNotification(notification);
	default :  return services.martiniService.sendNotification(notification);
	}
};

