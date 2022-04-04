import { BillingLocation } from "./party";

export interface IPartyForm {
    id: string | undefined,
    isLoading: boolean,
    name: string,
    showMessage: boolean,
    message: string,
    isSuccess: boolean,
    currentBalance: number,
    type: string,
    billingLocation: Array<BillingLocation>,
    isSubmit: boolean,
    submittionPayload?: any
}

export enum PartyFormActionEnum {
    LOADING = "LOADING",
    SET_UPDATE_PARTY_DATA = "SET_UPDATE_PARTY_DATA",
    PARTY_FIELD_CHANGED = "PARTY_FIELD_CHANGED",
    PARTY_LOCATION_ADD = "PARTY_LOCATION_ADD",
    PARTY_LOCATION_CHANGED = "PARTY_LOCATION_CHANGED",
    PARTY_DEFAULT_LOCATION_CHANGED = "PARTY_DEFAULT_LOCATION_CHANGED",
    PARTY_FINISH = "PARTY_FINISH",
    DELETE_LOCATION = "DELETE_LOCATION",
    SET_MESSAGE = "SET_MESSAGE",
    RESET_STATE = "RESET_STATE"
}

export default interface IPartyFormAction {
    type: PartyFormActionEnum,
    payload: any
}