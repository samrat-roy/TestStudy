import contractOrderMapper from '../common/mapper/contract-order-mapper';
import orderEntity from '../../../../common/types';

function mapContractHeaderToOrder(contractHeader){
	let order = orderEntity.getOrderAttributes();
	order.Header = contractOrderMapper.mapOrderHeader(contractHeader);
	order.Discounts = contractOrderMapper.mapOrderDiscounts(contractHeader);
	order.Customer = contractOrderMapper.mapOrderCustomerDetails(contractHeader);
	order.Delivery = contractOrderMapper.mapOrderDelivery(contractHeader);
	order.Price = contractOrderMapper.mapOrderPrice(contractHeader, null);
	return order;
}

export default mapContractHeaderToOrder;