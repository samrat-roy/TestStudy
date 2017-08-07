import config from '../../../../config';
import wcf from 'wcf.js';

async function cancelContractById(contractId, customerId) {	
	let wsHttpBinding = wcf.WSHttpBinding;
	let binding = new wsHttpBinding();
	let proxy = new wcf.Proxy(binding, config.api.wcfEndPoints.grocerycontractcoreservice);
	let messageBody = prepareCancelContractMessage(contractId, customerId);
	return new Promise((resolve, reject) => {
		proxy.send(messageBody, config.api.wcfactions.martini.cancelcontract, function (response, err ) {
			if (response) resolve();
			else reject(err);
		});
	});
}

function prepareCancelContractMessage(contractId, customerId) {
	return '<s:Envelope xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:s="http://www.w3.org/2003/05/soap-envelope">'
		+ '<s:Body><CancelContract xmlns="http://tempuri.org/">'
		+ '<contractId>' + contractId + '</contractId>'
		+ '<webCustomerId>' + customerId + '</webCustomerId>'
		+ '</CancelContract></s:Body></s:Envelope>';
}

export default cancelContractById;