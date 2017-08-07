import types from '../../../types';
exports.getPostCodeBagCharges = (postCodes, postCodeChargeDetails) => {
	return postCodeChargeDetails.map(item => {
		let postCodeChargeInfo = types.getPostCodeChargeAttributes();

		postCodeChargeInfo.PostCode = postCodes.find(postCode => {
			return postCode.replace(/\s+/g, '').includes(item.Postcode.replace(/\s+/g, ''));
		});
		
		postCodeChargeInfo.Amount = item.Amount;
		postCodeChargeInfo.HelpURL = item.HelpURL;
		postCodeChargeInfo.IsOptional = item.IsOptional;
		return postCodeChargeInfo;
	});
};