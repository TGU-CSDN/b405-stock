import { IUser } from './User'

export interface IStockItemOwnerInfo {
  _id: interface;
  number: number;
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
}
