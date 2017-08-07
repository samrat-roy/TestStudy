const HEADERSCHEMA = {
    "status": { "type":"string"},
    "type": "object",
    "properties": {
        "Business": {
            "type": "string"
        },
        "ContractID": {
            "type": "integer"
        },
        "Country": {
            "type": "string"
        },
        "CreatedBy": {
            "type": "string"
        },
        "CreatedDateTime": {
            "type": "string",
            "format":"date-time"
        },
        "Id": {
            "type": "integer"
        },
        "IsContractLegacy": {
            "type": "string"
        },
        "Language": {
            "type": "string"
        },
        "LastModifiedDateTime": {
            "type": "string",
            "format":"date-time"
        },
        "MartiniOrderId": {
            "type": "integer"
        },
        "Name": {
            "type": "string"
        },
        "Preference": {
            "type": "object",
            "properties": {
                "PickerNotes": {
                    "type": "string"
                }
            }
        },
        "RetailPrice": {
            "type": "number"
        },
        "Status": {
            "type": "string"
        },
        "Version": {
            "type": "integer"
        }
    }
};

export default HEADERSCHEMA;
