import IParty, { BillingLocation } from "../../components/party/model/party"

const createPartyObject = (data: any, id: string): IParty => {
    const billingLocations: Array<BillingLocation> = [];
    data?.billingLocations?.length && data.billingLocations.map((location: BillingLocation) => billingLocations.push(location));
    return {
        id: id,
        name: data.name,
        type: data.type,
        currentBalance: data.currentBalance,
        billingLocations: billingLocations
    };
}

const mapper = {
    createPartyObject
}

export default mapper;