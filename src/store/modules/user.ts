import { IUserProfile } from "./../../types/User.d";
import { Module } from "vuex";
import { UserState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import { hideLoading, showLoading, showToast } from "@/utils/helper";
// import {
//   removeRefreshToken,
//   removeToken,
//   setRefreshToken,
//   setToken,
// } from "@/utils/auth";

const user: Module<UserState, RootState> = {
  state: {
    logged: false,
    profile: null,
  },

  mutations: {
    [MutationTypes.SET_LOGIN]: (state, logged: boolean) => {
      state.logged = logged;
      console.debug(state);
    },
    [MutationTypes.SET_PROFILE]: (state, profile: IUserProfile) => {
      state.profile = profile;
      console.debug(state);
    },
  },

  actions: {
    [ActionTypes.login]: async (
      { commit, dispatch },
      initProfile: boolean = false
    ) => {
      return new Promise<void>(async (resolve, reject) => {
        showLoading("登录中");
        let userProfile = null;
        if (initProfile) {
          userProfile = await dispatch(ActionTypes.initProfile);
        }
        try {
          const res: any = await wx.cloud.callFunction({
            name: "login",
          });
          if (!res.result.data?.username || !res.result.data?.avatar_url) {
            await wx.cloud.callFunction({
              name: "edit_user_info",
              data: {
                username: userProfile.nickName,
                avatar_url: userProfile.avatarUrl,
              },
            });
            commit(MutationTypes.SET_PROFILE, {
              username: userProfile.nickName,
              avatar_url: userProfile.avatarUrl,
            });
          } else {
            commit(MutationTypes.SET_PROFILE, {
              username: res.result.data.username,
              avatar_url: res.result.data.avatar_url,
            });
          }
          commit(MutationTypes.SET_LOGIN, true);

          hideLoading();
          showToast("登录成功", "success");
          resolve();
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    },
    [ActionTypes.initProfile]: ({ commit }) => {
      return new Promise<void>((resolve, reject) => {
        // @ts-ignore
        wx.getUserProfile({
          desc: "用于完善个人资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res: any) => {
            const userInfo = res.userInfo;
            console.log(userInfo);
            resolve(userInfo);
          },
        });
      });
    },
  },

  getters: {
    logged: (state) => state.logged,
    profile: (state) => state.profile,
  },
};

export default user;
