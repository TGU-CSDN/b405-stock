import { IUserProfile } from './User'

export interface IStockItemOwnerInfo {
  _id: interface;
  number: number;
  price: number | null;
  user: IUserProfile;
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

export interface IStockRecord {
  _id: string;
  action_type: "buy" | "edit";
  belonger_user: IUserProfile;
  operator_user: IUserProfile;
  old_number: number;
  new_number: number;
  stock_id: string;
  time: number;
}
