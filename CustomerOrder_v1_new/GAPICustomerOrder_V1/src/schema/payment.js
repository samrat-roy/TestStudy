const PAYMENT_SCHEMA = {
  "id": "/Payment",
  "properties": {
    "CardDetails": {
      "properties": {
        "AuthorisationCode": {
          "type": "string"
        },
        "CardAuthentAtsd": {
          "type": "string"
        },
        "CardAuthentEci": {
          "type": "string"
        },
        "CardAuthentPares": {
          "type": "string"
        },
        "CardAuthentPosem": {
          "type": "string"
        },
        "CardAuthentXid": {
          "type": "string"
        },
        "CardNumber": {
          "type": "string"
        },
        "CardType": {
          "type": "string"
        },
        "CardholderName": {
          "type": "string"
        },
        "ExpiryDate": {
          "type": "string"
        },
        "Last4digit": {
          "type": "string"
        },
        "StartDate": {
          "type": "string"
        }
      },
      "type": "object"
    },
    "Token": {
      "type": "string"
    }
  },
  "type": "object"
};

export default PAYMENT_SCHEMA;
