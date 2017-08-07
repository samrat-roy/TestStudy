import contractMapper from '../common/mapper/contract-order-mapper';
import moment from 'moment';
import orderEntity from '../../../../common/types';

function mapContractsToOrders(contracts) {
	let orders = contracts.map(contract => {
		let order = orderEntity.getOrderAttributes();
		order.Header = contractMapper.mapOrderHeader(contract.ContractHeader[0]);
		order.LineItems = contractMapper.mapOrderLineItems(contract.GroceryBasketItemEntities[0].GroceryBasketItemEntity);
		order.Customer = contractMapper.mapOrderCustomerDetails(contract.ContractHeader[0]);
		order.Discounts = contractMapper.mapOrderDiscounts(contract.ContractHeader[0]);
		order.Payment = contractMapper.mapOrderPayment(contract.ContractHeader[0].PaymentBasketEntity[0].PaymentCardDetails[0].PaymentCardDetailsEntity[0]);
		order.Delivery = contractMapper.mapOrderDelivery(contract.ContractHeader[0]);
		order.Price = contractMapper.mapOrderPrice(contract.ContractHeader[0], order.LineItems);
		return order;
	});

	if (orders.length == 2) {
		if (moment(orders[0].Header.LastModifiedDateTime).diff(moment(orders[1].Header.LastModifiedDateTime)) > 0) {
			orders[0].Header.Version = 2;
			orders[1].Header.Version = 1;
		} else {
			orders[0].Header.Version = 1;
			orders[1].Header.Version = 2;
		}
	}
	
	return orders;
}

export default mapContractsToOrders;