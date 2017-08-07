#### New Order Entity

```
{
  "Order": {
    "Header": {
      "Status": "Pending",
      "Id": 123456,
      "MartiniOrderId": 1233123,
      "ContractID": 404987,
      "Version": 2,
      "Name": "My Basket",
      "CreatedBy": "Web",
      "Business": "Grocery",
      "Language": "en-GB",
      "Country": "GB",
      "IsContractLegacy": false,
      "CreatedDateTime": "2016-04-21T08:26:46.043888+01:00",
      "LastModifiedDateTime": "2016-04-21T08:26:46.043888+01:00"
    },
    "Delivery": [
      {
        "GroupId": 1,
        "Option": "VanDelivery",
        "SlotState": "booked",
        "SlotType": 1,
        "StoreId": 2020,
        "SlotStartDateTime": "2016-10-14T15:00:00",
        "SlotEndDateTime": "2016-10-14T16:00:00",
        "SlotCutoffDateTime": "2016-10-13T23:46:00",
        "SlotReservationExpiryDateTime": "2017-04-05T01:20:04.743",
        "SlotId": "31202016101415000020161014160000#/#3120_001-201610",
        "ReservationId": 6630760,
        "IsGreen": false,
        "IsActiveSlotType": true,
        "Location": {
          "Id": 8450,
          "Lat": 50.0987,
          "Long": 09.876,
          "GridX": "6547",
          "GridY": "0987"
        },
        "WithBag": true,
        "Notes": "",
        "Addresses": {
          "DeliveryAddress": {
            "BuildingNameNumber": "Bracknell Building",
            "GridReference": "9999999999",
            "BuildingType": "Detach",
            "LegacyAddressString": "#Bracknell Building,Bracknell street,Bracknell,Bracknell forest",
            "Locality": "Bracknell",
            "Nickname": "Bracknell Forest",
            "PafValidated": "false",
            "PostalTown": "Bracknell forest",
            "Postcode": "HP108AA",
            "StreetName": "Bracknell street",
            "SubBuildingNumber": "",
            "DxshAddressNo": 0,
            "MartiniAddressId": 0,
            "Contact":{  
                "PhoneDay": "0123456789",  
                "PhoneEvening": "0123456788",  
                "PhoneMobile": "0123456777"
            }
          },
          "BillingAddress": {
            "Nickname": "Hp108AA",
            "OrganisationName": "",
            "BuildingNameNumber": "0001",
            "SubBuildingNumber": "",
            "BuildingType": "NotDefined",
            "PostalTown": "High Wycombe",
            "Postcode": "HP108AA",
            "LegacyAddressString": "#0001 Hazlemere Road,Penn,High Wycombe",
            "Locality": "Penn",
            "PafValidated": "false",
            "StreetName": "Hazlemere Road",
            "DxshAddressNo": 1,
            "MartiniAddressId": 1294828,  
            "Contact":{  
                "PhoneDay": "0123456789",  
                "PhoneEvening": "0123456788",  
                "PhoneMobile": "0123456777"
            }
          }
        },  
        "Charges": {  
          "DeliveryCharge": {  
            "Description": "Delivery Charge",  
            "Amount": 40
          },  
          "BagCharge": {
            "Description": "Bag Charge",
            "TypeID": 1,
            "Amount": 0.4000,
            "HelpURL": "/groceries/help/default.aspx?name=myDelivery&amp;rel=help#Q17",
            "IsOptional": "false",
            "IsApplied": "false"
          }
        },
        "FulfillmentOptions": [
          {
            "FulfillmentId": 1,
            "FulfillmentType": "FT_DO",
            "ItemGroupCode": "DS",
            "LineType": "STANDARD",
            "ReservationID": "",
            "OrderedQty": "1",
            "ReqShipDate": "2015-04-17T12:28:00.0",
            "ShipNode": "WH_CMBRE",
            "SubLineNo": "1",
            "SCAC": "Carrier",
            "ScacAndService": "Carrier - TESCO_Standard-UKMainland",
            "TransactionalLineId": "sg34820097"
          }
        ]
      },
      {
        "GroupId": 2,
        "Option": "VanDelivery",
        "SlotState": "booked",
        "SlotType": 4,
        "StoreId": 2021,
        "SlotStartDateTime": "2016-10-14T15:00:00",
        "SlotEndDateTime": "2016-10-14T16:00:00",
        "SlotCutoffDateTime": "2016-10-13T23:46:00",
        "SlotReservationExpiryDateTime": "2017-04-05T01:20:04.743",
        "SlotId": "31202016101415000020161014160000#/#3120_001-201610",
        "ReservationId": 6630760,
        "IsGreen": false,
        "IsActiveSlotType": true,
        "Location": {
          "Id": 8450,
          "Lat": 50.0987,
          "Long": 09.876,
          "GridX": "6547",
          "GridY": "0987"
        },        
        "WithBag": true,
        "Notes": "",
        "Addresses": {
          "DeliveryAddress": {
            "BuildingNameNumber": "Bracknell Building",
            "GridReference": "9999999999",
            "BuildingType": "Detach",
            "LegacyAddressString": "#Bracknell Building,Bracknell street,Bracknell,Bracknell forest",
            "Locality": "Bracknell",
            "Nickname": "Bracknell Forest",
            "PafValidated": "false",
            "PostalTown": "Bracknell forest",
            "Postcode": "HP108AA",
            "StreetName": "Bracknell street",
            "SubBuildingNumber": "",
            "DxshAddressNo": 0,
            "MartiniAddressId": 0,  
            "Contact":{  
                "PhoneDay": "0123456789",  
                "PhoneEvening": "0123456788",  
                "PhoneMobile": "0123456777"
            }
          },
          "BillingAddress": {
            "Nickname": "Hp108AA",
            "OrganisationName": "",
            "BuildingNameNumber": "0001",
            "SubBuildingNumber": "",
            "BuildingType": "NotDefined",
            "PostalTown": "High Wycombe",
            "Postcode": "HP108AA",
            "LegacyAddressString": "#0001 Hazlemere Road,Penn,High Wycombe",
            "Locality": "Penn",
            "PafValidated": "false",
            "StreetName": "Hazlemere Road",
            "DxshAddressNo": 1,
            "MartiniAddressId": 1294828,  
            "Contact":{  
                "PhoneDay": "0123456789",  
                "PhoneEvening": "0123456788",  
                "PhoneMobile": "0123456777"
            }
          }
        },  
        "Charges": {  
          "DeliveryCharge": {  
            "Description": "Delivery Charge",  
            "Amount": 40  
          },  
          "BagCharge": {
            "Description": "Bag Charge",
            "TypeID": 1,
            "Amount": 0.4000,
            "HelpURL": "/groceries/help/default.aspx?name=myDelivery&amp;rel=help#Q17",
            "IsOptional": "false",
            "IsApplied": "false"
          }
        },
        "FulfillmentOptions": []
      }
    ],
    "Payment": {
      "Token": "3712638716sdfsdkfksf93",
      "CardDetails": {
        "AuthorisationCode": "12345",
        "CardAuthentCavv": "",  
        "IssueNumber": "",  
        "CardAuthentAtsd": "D08000",
        "CardAuthentEci": "",
        "CardAuthentPosem": "27",
        "CardAuthentXid": "",
        "CardType": "VI",
        "StartDate": "",
        "CardholderName": "test",
        "CardNumber": "KZKZLZLZIZIZJZJZ",
        "ExpiryDate": "1019",
        "CardAuthentPares": "",
        "Last4digit": "7896"
      }
    },
    "Customer": {
      "Id": 2301054865,
      "DxshId": 100389558,
      "Title": "Mr  ",
      "Initials": "   ",
      "Forename": "you",
      "Surname": "SomeOne",
      "Email": "collection1@collection.com",
      "ClubcardNumber": 23010548651,
      "Type": "PAH",
      "IsStaffMember": "false"
    },
    "LineItems": [
      {
        "DeliveryGroupId": "1",
        "ProductId": "256667354",
        "BaseProductId": "51351439",
        "Description": "Tesco Braeburn Apples Min 5Pk Class 1",
        "InStorePrice": 1.50,
        "InStoreTotalPrice": 15.00,
        "InStoreQuantity": 0.00,
        "ChoiceQuantity": 10,
        "QuantityOriginal": 0,
        "ChoiceWeight": 0.0,
        "WeightOriginal": 0.0,
        "MaxWeight": 0.0,
        "AverageWeight": 0.0,
        "Weight": 0.953,
        "Volume": 2.400,
        "Type": "Single",
        "ChargeProductType": "Normal",
        "IsSelectedByQuantity": true,
        "MeasureType": "Unit",
        "UnitOfSale": "Item",
        "SubstitutionOption": "FindSuitableAlternative",
        "LineNumber": 1,
        "PickerNote": "",
        "IsNewlyAdded": True,
        "AddedDateTime": "2016-04-21T08:07:06.897",
        "LastUpdated": "0001-01-01T00:00:00",
        "ExtnIsReturnable": "",
        "ExtnSeller": "",
        "Rewards": [
          {
            "RewardValue": 0.38,
            "RewardType": "CashReward",
            "PromotionId": "A32173603"
          }
        ]
      },
      {
        "DeliveryGroupId": 2,
        "ProductId": "256667354",
        "BaseProductId": "51351439",
        "Description": "Tesco Braeburn Apples Min 5Pk Class 1",
        "InStorePrice": 1.50,
        "InStoreTotalPrice": 15.00,
        "InStoreQuantity": 0.0,
        "ChoiceQuantity": 10,
        "QuantityOriginal": 0,
        "ChoiceWeight": 0.0,
        "WeightOriginal": 0.0,
        "MaxWeight": 0.0,
        "AgerageWeight": 0.0,
        "Weight": 0.953,
        "Volume": 2.400,
        "Type": "Single",
        "ChargeProductType": "Normal",
        "IsSelectedByQuantity": "true",
        "MeasureType": "Unit",
        "UnitOfSale": "Item",
        "SubstitutionOption": "FindSuitableAlternative",
        "LineNumber": 1,
        "PickerNote": "",
        "IsNewlyAdded": True,
        "AddedDateTime": "2016-04-21T08:07:06.897",
        "LastUpdated": "0001-01-01T00:00:00",
        "ExtnIsReturnable": "",
        "ExtnSeller": "",
        "Rewards": []
      }
    ],
    "Discounts": {
      "Rewards": [
        {
          "RewardValue": 0.38,
          "RewardType": "CashReward",
          "PromotionId": "A32173603"
        }
      ],
      "Coupons": [
        {
          "Type": "Voucher",
          "Id": "A4M9JNTHCH69",
          "Name": "A4M9JNTHCH69",
          "Description": "Voucher A4M9JNTHCH69",
          "ExpiryDate": "2017-04-13T00:00:00",
          "Ean": "9611212011112175951300",
          "StartDate": "2017-04-11T10:39:00",
          "Value": 5.0,  
          "AssociationStatus": "New",    
          "Category":"Monetory"
        },  
        {
	      "Type": "Ecoupon",  
	      "Id": "TFYKZ6G473PL",
	      "Name": "AB16197",
	      "Description": "SPEND £20 ON YOGHURT AND GET £10 OFF",
	      "ExpiryDate": "2017-04-13T00:00:00",
	      "Ean": "",
	      "StartDate": "2017-04-11T10:39:00",
	      "Value": 5.0,
	      "CampaignId": 0,  
	      "MasterCampaignId":0,  
	      "AssociationStatus": "AmendCancelled",  
	      "Category":"Monetory"
	      },  
        {
	      "Type": "Ecoupon",
	      "Id": "GCCKXM43J4VH",
	      "Name": "GCCKX",
	      "Description": "85p off when you buy McCain frozen french fries",
	      "ExpiryDate": "2017-04-13T00:00:00",
	      "Ean": "9912885410854",
	      "StartDate": "2017-04-11T10:39:00",
	      "Value": 5.0000,  
	      "CampaignId":0,  
	      "MasterCampaignId":0,  
	      "AssociationStatus": "Confirmed",  
	      "Category":"Monetory"
	      }
      ],
      "StaffDiscount": 0,
      "PromotionalClubCardPoints": 2,
      "StandardClubCardPoints": 22,
      "TotalClubCardPoints": 22,
      "TotalGreenClubCardPoints": 0,
      "TotalCoupons": 0,
      "TotalGiftCards": 0,
      "TotalVouchers": 1,
      "TotalSavings": 3
    },  
    "Price":{
      "RetailPrice":83.50,
      "TotalPrice":88.20,
      "Surcharge":0.4
    }  
  }
}
```
