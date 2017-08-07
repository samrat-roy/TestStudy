import { Validator } from 'jsonschema';
import Coupons from './coupons';
import Rewards from './rewards';
let validator = new Validator();

const DISCOUNTS_SCHEMA = {
  "id": "/Discounts",
  "properties": {
    "Coupons": {
    "$ref": "/Coupons"
    },
    "PromotionalClubCardPoints": {
      "type": "string"
    },
    "Rewards": {
      "$ref": "/Rewards"
    },
    "StaffDiscount": {
      "type": "string"
    },
    "StandardClubCardPoints": {
      "type": "string"
    },
    "TotalClubCardPoints": {
      "type": "string"
    },
    "TotalCoupons": {
      "type": "string"
    },
    "TotalGiftCards": {
      "type": "string"
    },
    "TotalGreenClubCardPoints": {
      "type": "string"
    },
    "TotalSavings": {
      "type": "string"
    },
    "TotalVouchers": {
      "type": "string"
    }
  },
  "type": "object"
};

validator.addSchema(Coupons,'/Coupons');
//validator.addSchema(Rewards,'/Rewards');


export default DISCOUNTS_SCHEMA;
