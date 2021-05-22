<template>
  <view class="top">
    <div class="background" />
    <div class="content item">
      <image
        class="item__image"
        :src="data.image"
        mode="aspectFill"
      />
      <div class="item__info">
        <div class="item__info__title">
          {{ data.name }}
        </div>
        <div class="item__info__stock">
          库存 {{ data.stock_number }} 件
        </div>
      </div>
      <div
        class="item__action"
        @click="showActionSheet"
      >
        <div class="item__action__icon">
          <uni-icons
            type="more-filled"
            size="40"
            color="#ffffff"
          />
        </div>
      </div>
    </div>
  </view>
</template>

<script lang="ts">
import { IStockItem } from "@/types/StockItem";
import { defineComponent, PropType } from "vue";
// import { navigateTo } from "@/utils/helper";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<IStockItem>,
      default: null,
    },
  },
  setup() {
    function showActionSheet() {
      uni.showActionSheet({
        itemList: ["我的库存", "库存管理"],
        success: function (res) {
          console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        },
        fail: function (res) {
          console.log(res.errMsg);
        },
      });
    }

    return { showActionSheet };
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
    height: 216rpx;
    background: $uni-color-primary;
  }
  .item {
    width: 100%;
    height: 200rpx;
    display: flex;
    align-items: center;
    padding: 32rpx;
    box-sizing: border-box;

    &__image {
      width: 140rpx;
      height: 140rpx;
      border-radius: 16rpx;
    }
    &__info {
      flex: 1;
      color: $uni-text-color-inverse;
      margin-left: 32rpx;
      &__title {
        font-size: $uni-font-size-xl;
      }
      &__stock {
        margin-top: 16rpx;
        font-size: $uni-font-size-base;
      }
    }
    &__action {
      width: 120rpx;
      height: 180rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
