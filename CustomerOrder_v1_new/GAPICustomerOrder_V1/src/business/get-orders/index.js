import orderMapper from './mapper.js';
import repository from '../../resolver/repository';

export default async function getOrders(context) {
	let personaDetails = await repository.getPersonalDetails(context);
	let dxshId = personaDetails.DxshId;
	let orderSummaries = await repository.getOrders(context, dxshId);

	if (orderSummaries.length) {
		let contractIds = orderSummaries.map(item => { return item.ContractId; });
		let orders = await repository.getContractHeaders(context, contractIds);
		return orderMapper(orderSummaries, orders);
	}

	return [];
}