
export default interface IConfigContext {
    appName: string,
    appDefaultRoute: string,
    defaultUser: string,
    defaultRole: string,
    userDb: string,
    partyDb: string,
    partyType: Array<string>,
    billingType: Array<string>,
    headerHeight: string
}