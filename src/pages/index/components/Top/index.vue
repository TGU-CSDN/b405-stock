<template>
  <view class="top">
    <div class="background" />
    <div class="content">
      <div class="scan">
        <div
          class="scan__button"
          @click="handleClickScan"
        >
          <div class="scan__button__icon">
            <uni-icons
              type="scan"
              size="60"
              color="#197ae5"
            />
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script lang="ts">
import {
  hideLoading,
  navigateTo,
  showLoading,
  showToast,
} from "@/utils/helper";
import { defineComponent } from "vue";
// import { navigateTo } from "@/utils/helper";

export default defineComponent({
  props: {},
  setup() {
    async function handleClickScan() {
      try {
        const res: any = await uni.scanCode({
          onlyFromCamera: true,
          scanType: ["barCode"],
        });
        const code = res.result;
        showLoading();
        const checkRes: any = await wx.cloud.callFunction({
          name: "check_stock_item",
          data: {
            code,
          },
        });
        hideLoading();
        if (checkRes.result.success) {
          const id = checkRes.result.data._id;
          navigateTo("/pages/stockItemDetail/index", { id });
        } else {
          showToast("未找到该货品");
        }
      } catch (e) {
        showToast("扫码失败");
      }
    }

    return { handleClickScan };
  },
});
</script>

<style lang="scss" scoped>
.top {
  position: relative;
  .background {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 406rpx;
    background: $uni-color-primary;
  }
  .content {
    width: 100%;
    height: 390rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .scan {
      &__button {
        background: #ffffff;
        width: 240rpx;
        height: 240rpx;
        border-radius: 100%;
        box-shadow: 0rpx 8rpx 16rpx 4rpx rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
