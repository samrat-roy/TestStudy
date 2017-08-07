import { Validator } from 'jsonschema';
import Rewards from './rewards';
let validator = new Validator();


const LINEITEMS_SCHEMA = {
  "id": "/Lineitems",
  "items": {
    "id": "/items",
    "properties": {
      "AddedDateTime": {
        "type": "string"
      },
      "AgerageWeight": {
        "type": "string"
      },
      "BaseProductId": {
        "type": "string"
      },
      "ChargeProductType": {
        "type": "string"
      },
      "ChoiceQuantity": {
        "type": "string"
      },
      "ChoiceWeight": {
        "type": "string"
      },
      "DeliveryGroupId": {
        "type": "string"
      },
      "Description": {
        "type": "string"
      },
      "ExtnIsReturnable": {
        "type": "string"
      },
      "ExtnSeller": {
        "type": "string"
      },
      "InStorePrice": {
        "type": "string"
      },
      "InStoreQuantity": {
        "type": "string"
      },
      "InStoreTotalPrice": {
        "type": "string"
      },
      "IsNewlyAdded": {
        "type": "string"
      },
      "IsSelectedByQuantity": {
        "type": "string"
      },
      "LastUpdated": {
        "type": "string"
      },
      "LineNumber": {
        "type": "string"
      },
      "MaxWeight": {
        "type": "string"
      },
      "MeasureType": {
        "type": "string"
      },
      "PickerNote": {
        "type": "string"
      },
      "ProductId": {
        "type": "string"
      },
      "QuantityOriginal": {
        "type": "string"
      },
      "Rewards": {
        "$ref": "/Rewards"
      },
      "SubstitutionOption": {
        "type": "string"
      },
      "Type": {
        "type": "string"
      },
      "UnitOfSale": {
        "type": "string"
      },
      "Volume": {
        "type": "string"
      },
      "Weight": {
        "type": "string"
      },
      "WeightOriginal": {
        "type": "string"
      }
    },
    "type": "object"
  },
  "type": "array"
};

validator.addSchema(Rewards,'/Rewards');

export default LINEITEMS_SCHEMA;
