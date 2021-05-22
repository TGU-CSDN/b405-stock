import { IUserProfile } from '@/types/User'

export interface RootState {
  version?: string;
  user: UserState;
}

export interface UserState {
  logged: boolean;
  profile: null | IUserProfile;
}
