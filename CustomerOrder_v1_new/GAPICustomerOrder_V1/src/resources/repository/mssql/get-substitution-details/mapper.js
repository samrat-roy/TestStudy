import types from '../../../types';
import commonTypes from '../../../../common/types';

exports.mapSubstitutionDetails = (substitutionInfo) => {
	let substitutionDetails = new Map();
	
	substitutionInfo.forEach(item => {
		let substitutionDetail = types.getSubstitutionDetailsAttributes();		
		substitutionDetail.PickerNote = item.PickerNote;
		substitutionDetail.SubstitutionOption = commonTypes.SubstitutionOption.get(item.SubstitutionOptionID).key;
		substitutionDetails.set(item.BaseProductID, substitutionDetail);
	});

	return substitutionDetails;
};