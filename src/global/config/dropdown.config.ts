import IDropdownConfig from "../models/dropdownConfig";

const dropdownConfig: IDropdownConfig = {
    units: [
        {
            label: "Single",
            value: "single"
        },
        {
            label: "Box",
            value: "box"
        },
        {
            label: "Container",
            value: "container"
        }
    ],
    partyType: ["sale", "credit"],
    billingType: ["retail", "wholesale"]
}

export default dropdownConfig;