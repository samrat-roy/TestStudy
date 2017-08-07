import Location from './location';
import OrderSummary from './order-summary';
import PostCodeCharge from './postcode-charge';
import SubstitutionDetails from './substitution-details';

function getLocationDetailsAttributes(){
	return Object.assign({}, Location);
}
function getOrderSummaryAttributes(){
	return Object.assign({}, OrderSummary);
}
function getPostCodeChargeAttributes(){
	return Object.assign({}, PostCodeCharge);
}
function getSubstitutionDetailsAttributes(){
	return Object.assign({}, SubstitutionDetails);
}


module.exports = {
	getLocationDetailsAttributes,
	getOrderSummaryAttributes,
	getPostCodeChargeAttributes,
	getSubstitutionDetailsAttributes	
};
