const CUSTOMER_SCHEMA = {
  "id": "/Customer",
  "properties": {
    "ClubcardNumber": {
      "type": "integer"
    },
    "DxshId": {
      "type": "integer"
    },
    "Email": {
      "type": "string"
    },
    "Forename": {
      "type": "string"
    },
    "Id": {
      "type": "integer"
    },
    "Initials": {
      "type": "string"
    },
    "IsStaffMember": {
      "type": "string"
    },
    "Surname": {
      "type": "string"
    },
    "Title": {
      "type": "string"
    },
    "Type": {
      "type": "string"
    }
  },
  "type": "object"
};

export default CUSTOMER_SCHEMA;
