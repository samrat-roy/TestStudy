import HeaderSchema from './header';
import DeliverySchema from './delivery';
import PaymentSchema from './payment';
import CustomerSchema from './customer';
import LineitemsSchema from './lineitems';
import DiscountsSchema from './discounts';
import SurchargeSchema from './surcharge';


module.exports = {
  Header:HeaderSchema,
  Delivery:DeliverySchema,
  Payment:PaymentSchema,
  Customer:CustomerSchema,
  Lineitems:LineitemsSchema,
  Discounts:DiscountsSchema,
  Surcharge:SurchargeSchema
}
