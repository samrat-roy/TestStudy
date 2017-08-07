import types from '../../../types';

exports.mapToOrderSummaries = function (orderDetails){
	return orderDetails.map(detail => {
		let orderSummary = types.getOrderSummaryAttributes();
		orderSummary.ContractId = detail.ContractId;
		orderSummary.VersionID = detail.VersionID;
		return orderSummary;
	});	
};
