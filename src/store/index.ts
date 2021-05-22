import { createStore } from "vuex";

import user from "./modules/user";
import stock from "./modules/stock";

export default createStore({
  modules: {
    user,
    stock,
  },
});
