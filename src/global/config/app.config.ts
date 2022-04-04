import IConfigContext from "../models/config.context"

const config: IConfigContext = {
    appName: "Mahajan Electricals",
    appDefaultRoute: "/dashboard",
    defaultUser: "guest",
    defaultRole: "guest",
    userDb: "me_users",
    partyDb: "parties",
    headerHeight: "50px",
    partyType: ["credit", "sale"],
    billingType: ["retail", "wholesale"]
}
export default config