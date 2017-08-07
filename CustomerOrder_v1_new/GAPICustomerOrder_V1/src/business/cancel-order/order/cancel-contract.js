import repository from '../../../resolver/repository';

async function cancelContract(context, contractId) {
	return await repository.cancelContract(context, contractId);
}

export default cancelContract;