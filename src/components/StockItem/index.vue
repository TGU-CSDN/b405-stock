<template>
  <div class="item">
    <image
      class="item__image"
      :src="data.image"
      mode="aspectFill"
      lazy-load
    />
    <div class="item__desc">
      <div class="item__desc__title">
        {{ data.name }}
      </div>
      <div class="item__desc__stock">
        {{ data.stock_number }} 件
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IStockItem } from "@/types/StockItem";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<IStockItem>,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.item {
  width: 300rpx;
  height: 450rpx;
  &__image {
    width: 300rpx;
    height: 300rpx;
    border-radius: 16rpx;
  }
  &__desc {
    margin-top: 8rpx;
    &__title {
      font-size: $uni-font-size-lg;
      color: $uni-text-color;
    }
    &__stock {
      font-size: $uni-font-size-base;
      color: $uni-text-color-darkgrey;
    }
  }
}
</style>
