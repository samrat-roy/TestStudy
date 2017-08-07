import Enum from 'enum';

const NotificationType = new Enum({
	'RegistrationConfirmation': 1,
	'CustomerDetailsUpdateConfirmation': 2,
	'EmailAddressUpdate': 3,
	'PasswordReset': 4,
	'OrderConfirmation': 5,
	'OrderConfirmationFirstTimeShopper': 6,
	'OrderAmendmentConfirmation': 7,
	'OrderCancellationConfirmation': 8,
	'RecomendAFriendToFriend': 9,
	'RecomendAFriendToRecommender': 10,
	'BasketSizeWarning': 11,
	'WineOrderConfirmation': 12
});

export default NotificationType;