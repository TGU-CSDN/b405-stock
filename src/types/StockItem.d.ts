import { IUser } from './User'

export interface IStockItemOwnerInfo {
  id: number;
  on_sale: boolean;
  stock_number: number;
  price: number | null;
  user: IUser;
}

export interface IStockItem {
  id: number;
  name: string;
  image: string;
  code: number;
  stock_number: number;
  stock_list?: Array<IStockItemOwnerInfo>;
}
