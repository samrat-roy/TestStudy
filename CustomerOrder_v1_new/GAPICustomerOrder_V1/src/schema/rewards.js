const REWARDS_SCHEMA = {
    "id": "/Rewards",
    "items": {
        "id": "/items",
        "properties": {
            "PromotionId": {

                "type": "string"
            },
            "Reward Amount": {

                "type": "string"
            },
            "RewardType": {

                "type": "string"
            }
        },
        "type": "object"
    },
    "type": "array"
};

export default REWARDS_SCHEMA;
