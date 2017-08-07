import config from '../../../config';
import moment from 'moment';
import {NotificationType} from '../../../common/types';
import repository from '../../../resolver/repository';

function sendEmail(order, context) {

	let notification = {
		notificationSubject : `${config.api.cancelmailsubject}  ${order.Header.MartiniOrderId}`,
		notificationFormat : config.api.mailformat,
		senderAddress : config.api.senderaddress,
		destinationAddress : order.Customer.Email,
		notificationMethod : 'Email',
		notificationType : NotificationType.getKey(8),
		notificationMessage : getNotificationMessage(order)
	};
	repository.sendNotification(context, notification);
}

function getNotificationMessage(order) {
	let startTime = getFormattedTime(order.Delivery[0].SlotStartDateTime);
	let endTime = getFormattedTime(order.Delivery[0].SlotEndDateTime);
	let formattedDate = getFormattedDate(order.Delivery[0].SlotStartDateTime);
	return `&lt;?xml version=\"1.0\" encoding=\"utf-8\"?&gt;&lt;TescoDataExchange&gt;&lt;Recipient&gt;&lt;Title&gt;${order.Customer.Title}&lt;/Title&gt;`
	+`&lt;Surname&gt;${order.Customer.Surname}&lt;/Surname&gt;&lt;/Recipient&gt;&lt;OrderRef&gt;${order.Header.MartiniOrderId}&lt;/OrderRef&gt;`
	+`&lt;StartDateTime&gt;${startTime}&lt;/StartDateTime&gt;&lt;EndDateTime&gt;${endTime}&lt;/EndDateTime&gt;&lt;Date&gt;${formattedDate}&lt;/Date&gt;`
	+`&lt;AddressNickname&gt;${order.Delivery[0].Addresses.DeliveryAddress.Nickname}&lt;/AddressNickname&gt;`
	+`&lt;DeliveryOption&gt;${order.Delivery[0].Option}&lt;/DeliveryOption&gt;&lt;/TescoDataExchange&gt;`;
	
}

function getFormattedTime(time) {
	return moment(time).minutes() == 0 ? moment(time).format('ha') : moment(time).format('h ma');
}

function getFormattedDate(date) {
	return moment(date).format('YYYY') == moment().format('YYYY') ?
		moment(date).format('dddd Do MMMM') : moment(date).format('dddd Do MMMM YYYY');
}

export default sendEmail;