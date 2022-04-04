interface IUnits {
    label: string,
    value: string
}

export default interface IDropdownConfig {
    units: Array<IUnits>,
    partyType: Array<string>,
    billingType: Array<string>
}