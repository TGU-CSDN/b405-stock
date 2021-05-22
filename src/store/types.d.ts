import { IUserProfile } from '@/types/User'
import { IStockItemWithInfo } from '@/types/StockItem'

export interface RootState {
  version?: string;
  user: UserState;
}

export interface UserState {
  logged: boolean;
  profile: null | IUserProfile;
}

export interface StockState {
  list: Array<IStockItemWithInfo>;
}
