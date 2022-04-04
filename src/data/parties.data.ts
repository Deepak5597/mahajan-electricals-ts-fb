import IParty from "../components/party/model/party"

const partiesDummyData: Array<IParty> = [
    {
        "id": "1",
        "name": "Deepak Bisht",
        "type": "credit",
        "currentBalance": 0,
        "billingLocations": [
            {
                "billingName": "Deepak House",
                "address": "Golna Karadiya Almora",
                "phone": "+919675697987",
                "billingType": "retail",
                "isDefault": false
            }
        ]
    }
]
export default partiesDummyData;