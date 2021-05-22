import { Module } from "vuex";
import { StockState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";

const stock: Module<StockState, RootState> = {
  state: {
    list: [],
  },

  mutations: {
    [MutationTypes.SET_STOCK_LIST]: (state, list: typeof state.list) => {
      state.list = list;
      console.debug(state);
    },
  },

  actions: {
    [ActionTypes.getStockList]: async ({ commit }) => {
      const res: any = await wx.cloud.callFunction({
        name: "get_stock_items",
      });
      commit(MutationTypes.SET_STOCK_LIST, res.result.data);
    },
  },

  getters: {
    stockList: (state) => state.list,
  },
};

export default stock;
