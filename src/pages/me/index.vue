<template>
  <view class="me">
    <Top />
    <view class="menu">
      <MenuItem
        v-if="!logged"
        title="登录"
        @tap="handleLogin"
      />
      <MenuItem
        v-if="logged"
        icon="person"
        title="个人资料"
        path="/pages/profile/index"
      />
      <MenuItem
        v-if="logged"
        icon="plus"
        title="添加货品"
        path="/pages/editStockItem/index"
      />
      <!-- <MenuItem
        v-if="logged"
        icon="minus"
        title="退出"
      /> -->
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Top from "./components/Top/index.vue";
import MenuItem from "./components/MenuItem/index.vue";
import { useStore } from "vuex";
import { ActionTypes } from "@/enums/actionTypes";

export default defineComponent({
  components: { Top, MenuItem },
  setup() {
    const store = useStore();

    const logged = computed(() => {
      return store.getters.logged;
    });

    async function handleLogin() {
      store.dispatch(ActionTypes.login, true);
    }

    return { logged, handleLogin };
  },
});
</script>

<style lang="scss" scoped>
.me {
  min-height: 100vh;
  background-color: #eeeeee;
}

.menu {
  position: relative;
  top: -64rpx;
  padding: 0 32rpx;
  box-sizing: border-box;
}
</style>
