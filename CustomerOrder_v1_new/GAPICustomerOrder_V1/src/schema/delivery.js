import { Validator } from 'jsonschema';
import Addresses from './addresses';
import Charges from './charges';
import Location from './location';
import FulfillmentOptions from './fulfillment-options';
let validator = new Validator();

const DELIVERY_SCHEMA = {
  "id": "/Delivery",
  "items": {
    "properties": {
      "Addresses": {
        "$ref": "/Addresses"
      },
      "Charge": {
        "type": "string"
      },
      "Charges": {
        "$ref": "/Charges"
      },
      "FulfillmentOptions": {
        "$ref": "/FulfillmentOptions"
      },
      "GroupId": {
        "type": "string"
      },
      "IsActiveSlotType": {
        "type": "string"
      },
      "IsGreen": {
        "type": "string"
      },
      "Location": {
        "$ref": "/Location"
      },
      "Notes": {
        "type": "string"
      },
      "Option": {
        "type": "string"
      },
      "ReservationId": {
        "type": "string"
      },
      "SlotCutoffDateTime": {
        "type": "string"
      },
      "SlotEndDateTime": {
        "type": "string"
      },
      "SlotId": {
        "type": "string"
      },
      "SlotReservationExpiryDateTime": {
        "type": "string"
      },
      "SlotStartDateTime": {
        "type": "string"
      },
      "SlotState": {
        "type": "string"
      },
      "SlotType": {
        "type": "string"
      },
      "StoreId": {
        "type": "string"
      },
      "WithBag": {
        "type": "string"
      }
    },
    "type": "object"
  },
  "type": "array"
}

validator.addSchema(Addresses,'/Addresses');
validator.addSchema(Charges,'/Charges');
validator.addSchema(Location,'/Location');
validator.addSchema(FulfillmentOptions,'/FulfillmentOptions');


export default DELIVERY_SCHEMA;
