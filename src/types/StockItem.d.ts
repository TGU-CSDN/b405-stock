import { IUser } from './User'

export interface IStockItemOwnerInfo {
  id: number;
  on_sale: boolean;
  stock_number: number;
  price: number | null;
  user: IUser;
}

export interface IStockItem {
  _id: string;
  name: string;
  image: string;
  code: string;
}

export interface IStockItemWithInfo {
  _id: string;
  name: string;
  image: string;
  code: string;
  stock_number: number;
  stock_list: Array<IStockItemOwnerInfo>;
}
