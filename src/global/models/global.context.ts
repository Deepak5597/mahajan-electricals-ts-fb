import IItem from '../../components/item/model/item';
import IParty from '../../components/party/model/party';
import IDropdownConfig from './dropdownConfig';

export default interface IGlobalContext {
    parties: Array<IParty>,
    items: Array<IItem>,
    companies: Array<string>,
    dropdownConfig: IDropdownConfig,
    setParties?: Function,
    setItems?: Function,
    setCompanies?: Function
}