const FULFILLMENT_OPTIONS = {
   "id":"/FulfillmentOptions",
   "items":{
      "properties":{
         "FulfillmentId":{
            "type":"integer"
         },
         "FulfillmentType":{
            "type":"string"
         },
         "ItemGroupCode":{
            "type":"string"
         },
         "LineType":{
            "type":"string"
         },
         "OrderedQty":{
            "type":"string"
         },
         "ReqShipDate":{
            "type":"string"
         },
         "ReservationID":{
            "type":"string"
         },
         "SCAC":{
            "type":"string"
         },
         "ScacAndService":{
            "type":"string"
         },
         "ShipNode":{
            "type":"string"
         },
         "SubLineNo":{
            "type":"string"
         },
         "TransactionalLineId":{
            "type":"string"
         }
      },
      "type":"object"
   },
   "type":"array"
};


export default FULFILLMENT_OPTIONS;
