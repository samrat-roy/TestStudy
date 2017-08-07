import Enum from 'enum';
const OrderStatus = new Enum({
	'PendingBasket':'Pending',
	'Pending':'Confirmed',
	'Open':'Open',	
	'InAmendment':'ReOpen',
	'CancelledByUser':'Cancelled',
	'CancelledByBackOffice':'Cancelled',
	'Delivered':'Confirmed'
});
export default OrderStatus;