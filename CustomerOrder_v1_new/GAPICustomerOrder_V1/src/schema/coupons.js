const COUPONS_SCHEMA = {
  "id": "/Coupons",
  "items": {
    "id": "/items",
    "properties": {
      "Description": {
        "type": "string"
      },
      "Ean": {
        "type": "string"
      },
      "ExpiryDate": {
        "type": "string"
      },
      "Id": {
        "type": "string"
      },
      "Name": {
        "type": "string"
      },
      "StartDate": {
        "type": "string"
      },
      "Type": {
        "type": "string"
      },
      "Value": {
        "type": "string"
      }
    },
    "type": "object"
  },
  "type": "array"
};

export default COUPONS_SCHEMA;
