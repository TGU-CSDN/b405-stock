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
import { defineComponent } from "vue";
// import { navigateTo } from "@/utils/helper";

export default defineComponent({
  props: {},
  setup() {
    function handleClickScan() {
      uni.scanCode({
        onlyFromCamera: true,
        scanType: ["barCode"],
        success: (res: any) => {
          console.log(res);
        },
      });
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
