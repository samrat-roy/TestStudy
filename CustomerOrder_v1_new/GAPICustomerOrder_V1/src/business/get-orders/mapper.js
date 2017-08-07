function mapOrderSummariesToOrders(orderSummaries, orders) {
	orders.forEach(order => {		
		let orderSummary = orderSummaries.find(summary => {
			return summary.ContractId == order.Header.ContractID;
		});
		order.Header.Version = orderSummary.VersionID;
	});

	return orders;
}

export default mapOrderSummariesToOrders;