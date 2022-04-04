import IPartyFormAction, { IPartyForm, PartyFormActionEnum } from "../model/party.form";

const partyFormReducer = (state: IPartyForm, action: IPartyFormAction) => {
    const { type, payload } = action;

    const preparePartyData = (state: IPartyForm) => {
        const billingLocations = state.billingLocation.map(bl => {
            if (!bl.phone.startsWith("+91")) {
                return { ...bl, phone: "+91".concat(bl.phone) }
            }
            return bl;
        })
        return { id: state.id, name: state.name, type: state.type, currentBalance: state.currentBalance, billingLocations: billingLocations }
    }

    switch (type) {
        case PartyFormActionEnum.LOADING:
            return { ...state, isLoading: false }
        case PartyFormActionEnum.SET_UPDATE_PARTY_DATA:
            return { ...state, id: payload.id, name: payload.name, type: payload.type, currentBalance: payload.currentBalance.replace('+', ''), billingLocation: payload.billingLocation }
        case PartyFormActionEnum.PARTY_FIELD_CHANGED:
            return { ...state, showMessage: false, [payload.field]: payload.newValue };
        case PartyFormActionEnum.PARTY_LOCATION_ADD:
            if (state.billingLocation.length > 0) {
                return { ...state, showMessage: false, billingLocation: [...state.billingLocation, { billingName: "default", address: "default", phone: "", billingType: "retail", isDefault: false }] };
            } else {
                return { ...state, showMessage: false, billingLocation: [...state.billingLocation, { billingName: "default", address: "default", phone: "", billingType: "retail", isDefault: true }] };
            }
        case PartyFormActionEnum.PARTY_LOCATION_CHANGED:
            const newBillingLocation = state.billingLocation.map((location, index) => {
                if (Number(payload.locationIndex) === index) {
                    return { ...location, [payload.field]: payload.newValue }
                } else {
                    return { ...location };
                }
            })
            return { ...state, billingLocation: newBillingLocation, showMessage: false };
        case PartyFormActionEnum.PARTY_DEFAULT_LOCATION_CHANGED:
            const newPdlBillingLocation = state.billingLocation.map((location, index) => {
                if (Number(payload.locationIndex) === index) {
                    return { ...location, [payload.field]: true }
                } else {
                    return { ...location, [payload.field]: false };
                }
            })
            return { ...state, billingLocation: newPdlBillingLocation, showMessage: false };
        case PartyFormActionEnum.PARTY_FINISH:
            if (state.name === undefined || state.name === "") {
                return { ...state, isLoading: false, showMessage: true, message: "Party Name is Mandatory", isSuccess: false };
            }
            if (state.billingLocation.length === 0) {
                return { ...state, isLoading: false, showMessage: true, message: "No Billing Location Added", isSuccess: false };
            }
            const invalidBl = state.billingLocation.filter(bl => ((bl.billingName === "undefined" || bl.billingName === "") || (bl.phone === "undefined" || bl.phone === "")));
            if (invalidBl.length) {
                return { ...state, isLoading: false, showMessage: true, message: "Some of the Location is missing, either Name or Contact Number", isSuccess: false };
            }
            const partyPayload = preparePartyData(state);
            console.log(partyPayload)
            return { ...state, isSubmit: true, submittionPayload: partyPayload }
        case PartyFormActionEnum.DELETE_LOCATION:
            const newLdBillingLocation = state.billingLocation;
            const deletedElementStatus = newLdBillingLocation[payload.locationIndex].isDefault;
            newLdBillingLocation.splice(payload.locationIndex, 1);
            if (Boolean(deletedElementStatus)) {
                if (newLdBillingLocation.length > 0) {
                    newLdBillingLocation[0].isDefault = true;
                }
            }
            return { ...state, billingLocation: newLdBillingLocation, showMessage: false };
        case PartyFormActionEnum.SET_MESSAGE:
            return { ...state, showMessage: true, isLoading: false, message: payload.message, isSuccess: payload.isSuccess }
        case PartyFormActionEnum.RESET_STATE:
            return { id: undefined, isLoading: false, name: "", showMessage: false, message: "", isSuccess: false, currentBalance: 0, type: "credit", billingLocation: [{ billingName: "default", address: "default", phone: "", billingType: "retail", isDefault: true }], isSubmit: false }
        default:
            return state;
    }
}

export default partyFormReducer;
