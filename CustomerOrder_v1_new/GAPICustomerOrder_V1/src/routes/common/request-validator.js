import errorCodes from '../../common/error-codes';

exports.validate = (req) => {
	let validationErrors = errorCodes.ValidationErrorCodes;
	if (!req.headers['customer-id'] && !req.query.customerid)
		return Promise.reject(validationErrors.invalidCustomerDetails.err_message);
	if (!req.headers['authorization'])
		return Promise.reject(validationErrors.invalidAuthorizationHeader.err_message);
	return Promise.resolve();
};
