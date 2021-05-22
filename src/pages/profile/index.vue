<template>
  <view class="page">
    <view class="form">
      <u-input
        v-model="username"
        placeholder="请输入用户名"
        label="用户名"
      />
    </view>
    <view class="action">
      <UButton
        type="primary"
        @click="handleSave"
      >
        保存
      </UButton>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import UInput from "@/components/UInput/index.vue";
import UButton from "@/components/UButton/index.vue";
import { useStore } from "vuex";
import {
  hideLoading,
  navigateBack,
  showLoading,
  showToast,
} from "@/utils/helper";
import { ActionTypes } from "@/enums/actionTypes";

export default defineComponent({
  components: { UInput, UButton },
  setup() {
    const store = useStore();
    const username = ref("");

    onMounted(() => {
      username.value = store.getters.profile.username;
    });

    async function handleSave() {
      if (!username.value.trim()) {
        showToast("请输入用户名");
        return;
      }

      showLoading();

      try {
        await wx.cloud.callFunction({
          name: "edit_user_info",
          data: {
            username: username.value,
          },
        });
        await store.dispatch(ActionTypes.login);
      } catch (e) {
        console.error(e);
      }

      hideLoading();
      navigateBack();
    }

    return { username, handleSave };
  },
});
</script>

<style lang="scss" scoped>
.page {
  padding: 32rpx;
}

.action {
  margin-top: 32rpx;
  display: flex;
  justify-content: center;
}
</style>
