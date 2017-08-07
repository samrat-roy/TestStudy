const CHARGES_SCHEMA = {
  "id": "/Charges",
  "properties": {
    "BagCharge": {
      "properties": {
        "Amount": {
          "type": "string"
        },
        "Description": {
          "type": "string"
        },
        "HelpURL": {
          "type": "string"
        },
        "IsApplied": {
          "type": "string"
        },
        "IsOptional": {
          "type": "string"
        },
        "TypeID": {
          "type": "string"
        }
      },
      "type": "object"
    },
    "DeliveryCharge": {
      "properties": {
        "Amount": {
          "type": "string"
        },
        "Description": {
          "type": "string"
        }
      },
      "type": "object"
    }
  },
  "type": "object"
};

export default CHARGES_SCHEMA;
