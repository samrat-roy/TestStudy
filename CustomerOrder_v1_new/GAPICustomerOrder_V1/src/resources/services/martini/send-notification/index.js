import config from '../../../../config';
import logger from '../../../../resolver/logger'
import wcf from 'wcf.js';

async function sendNotification(notification) {
	let wsHttpBinding = wcf.WSHttpBinding;
	let binding = new wsHttpBinding();
	let proxy = new wcf.Proxy(binding, config.api.wcfEndPoints.notificationservice);
	let messageBody = prepareMessage(notification);
	proxy.send(messageBody, config.api.wcfactions.martini.sendnotification, function (response, err) {
		if (err) logger.logError(err);
	});
}

function prepareMessage(notification) {
	return '<s:Envelope xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:s="http://www.w3.org/2003/05/soap-envelope">'
		+ '<s:Body><SendNotification xmlns="http://tempuri.org/"><notification xmlns:d4p1="http://schemas.datacontract.org/2004/07/Tesco.Com.Framework.Services.Notification.NotificationEntities" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'
		+ '<d4p1:DestinationAddress>' + notification.destinationAddress + '</d4p1:DestinationAddress>'
		+ '<d4p1:NotificationBody>' + notification.notificationMessage + '</d4p1:NotificationBody><d4p1:NotificationContentTransformed i:nil="true"/>'
		+ '<d4p1:NotificationFormat>' + notification.notificationFormat + '</d4p1:NotificationFormat><d4p1:NotificationMethod>'
		+ notification.notificationMethod + '</d4p1:NotificationMethod><d4p1:NotificationSubject>'
		+ notification.notificationSubject + '</d4p1:NotificationSubject><d4p1:NotificationType>' +
		notification.notificationType + '</d4p1:NotificationType><d4p1:SenderAddress>' + notification.senderAddress
		+ '</d4p1:SenderAddress></notification></SendNotification></s:Body></s:Envelope>';
}

export default sendNotification;