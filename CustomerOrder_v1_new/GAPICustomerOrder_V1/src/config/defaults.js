module.exports = {
	'api': {
		'name': 'CustomerOrder Backend API',
		'cancelmailsubject' : 'Your Tesco.com grocery order has been cancelled',
		'version': '1.0.0',
		'mailformat' : 'HTML',
		'maxorderage': '42',
		'pendingorderscount': 30,
		'historyordercount': 30,
		'maxnumberoforders': 30,
		'senderaddress':'online@tesco.co.uk',
		'virtualStoreId': 99,
		'urls': {
			'grocerypreference': {
				'getpersonaldetails': 'grocerypreference/personaldetails',
				'getaddresses': 'grocerypreference/Address',
				'getglobalsubstitutiondetails': 'grocerypreference/customerpreference'
			},
			'tescoLocation': {
				'getlocationdetails': 'v1/tescoLocation/get?business=grocery&locationid='
			},
			'storedvalue': {
				'applycoupons' : 'v1/storedvalue/applycoupon/?codes=&business=grocery',
				'restorecoupons': 'v1/storedvalue/restorecoupon/?codes=&business=grocery',
				'addWalletitems': 'v1/storedvalue/wallet/Add?business=grocery',
				'deletewalletitems': 'v1/storedvalue/Wallet?codes=&reservationid=&business=grocery'
			},
			'transport': {
				'canceldeliveryslot': 'v1/transport/bookingslot/cancel/dotcom_van_delivery/{storeid}?business=grocery',
				'cancelcollectionslot': 'v1/transport/bookingslots/unreserve?business=grocery'
			}
		},
		'wcfactions': {
			'martini': {
				'cancelcontract': 'http://tempuri.org/IGroceryContractSvcCoreSDA/CancelContract',
				'sendnotification':'http://tempuri.org/INotificationServiceProvider/SendNotification',
				
			}
		},
		'wcfEndPoints': {
			'grocerycontractcoreservice': 'http://sharedwebservices:81/GROCERYCONTRACTSVCCORESDA/Grocery.ContractSvc.Core.SDA.svc',
			'notificationservice':'http://sharedwebservices:81/NOTIFICATIONSERVICE/Notification.svc'
		},
		'isv2tokenrequired': false,
		'deliveryslotexpirybuffer': 15,
		'mockjsonserverurl': 'http://localhost:3002'
	}
};
