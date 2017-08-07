import errorCodes from '../../common/error-codes';
import moment from 'moment';
import orderEntity from '../../common/types';
const businessErrorCodes = errorCodes.BusinessErrorCodes;

exports.validateOrderForCancellation = function (orderStatus, slotCutoffDateTime) {
	if ((orderStatus != orderEntity.OrderStatus.get('InAmendment').value &&
		orderStatus != orderEntity.OrderStatus.get('Pending').value)
		|| moment(slotCutoffDateTime).diff(moment()) < 0) {
		throw new Error(businessErrorCodes.invalidOrderForCancellation.err_message);
	}
};