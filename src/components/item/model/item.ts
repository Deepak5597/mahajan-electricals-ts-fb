export interface IItemPriceCategory {
    categoryType: string,
    categoryQuantity: number,
    retailPrice: number,
    wholesalePrice: number
}
export interface IItemStock {
    stockName: string,
    stockQuantity: number,
    price: Array<IItemPriceCategory>
}

export default interface IItem {
    id: string | undefined,
    shortName: string,
    longName: string,
    description: string,
    company: string,
    tax: number,
    category: string,
    stocks: Array<IItemStock>
}