export enum PartyStatus {
    active = "active",
    inactive = "inactive",
    deleted = "deleted"
}
export declare interface BillingLocation {
    billingName: string,
    address?: string,
    phone: string,
    billingType: "retail" | "wholesale",
    isDefault: boolean
}

export default interface IParty {
    id: string | undefined,
    name: string,
    type: "credit" | "sale",
    currentBalance: number | 0,
    billingLocations: Array<BillingLocation>
}
