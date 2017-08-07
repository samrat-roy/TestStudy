const ADDRESSES_SCHEMA ={
  "id": "/Addresses",
      "properties": {
        "BillingAddress": {
          "properties": {
            "BuildingNameNumber": {
              "type": "string"
            },
            "BuildingType": {
              "type": "string"
            },
            "DxshAddressNo": {
              "type": "string"
            },
            "LegacyAddressString": {
              "type": "string"
            },
            "Locality": {
              "type": "string"
            },
            "MartiniAddressId": {
              "type": "string"
            },
            "Nickname": {
              "type": "string"
            },
            "OrganisationName": {
              "type": "string"
            },
            "PafValidated": {
              "type": "string"
            },
            "PostalTown": {
              "type": "string"
            },
            "Postcode": {
              "type": "string"
            },
            "StreetName": {
              "type": "string"
            },
            "SubBuildingNumber": {
              "type": "string"
            }
          },
          "type": "object"
        },
        "DeliveryAddress": {
          "properties": {
            "BuildingNameNumber": {
              "type": "string"
            },
            "BuildingType": {
              "type": "string"
            },
            "DxshAddressNo": {
              "type": "string"
            },
            "GridReference": {
              "type": "string"
            },
            "LegacyAddressString": {
              "type": "string"
            },
            "Locality": {
              "type": "string"
            },
            "MartiniAddressId": {
              "type": "string"
            },
            "Nickname": {
              "type": "string"
            },
            "PafValidated": {
              "type": "string"
            },
            "PostalTown": {
              "type": "string"
            },
            "Postcode": {
              "type": "string"
            },
            "StreetName": {
              "type": "string"
            },
            "SubBuildingNumber": {
              "type": "string"
            }
          },
          "type": "object"
        }
      },
  "type": "object"
};

export default ADDRESSES_SCHEMA;
