<template>
  <view class="content">
    <StockItemOwnerInfo
      v-for="item in data"
      :key="item.id"
      :data="item"
    />
  </view>
</template>

<script lang="ts">
import { IStockItemOwnerInfo } from "@/types/StockItem";
import { defineComponent, ref } from "vue";
import StockItemOwnerInfo from "./StockItemOwnerInfo.vue";

const testData: Array<IStockItemOwnerInfo> = [
  {
    id: 1,
    on_sale: true,
    stock_number: 3,
    price: 3.5,
    user: {
      id: 1,
      name: "陈鸿飞",
      avatar: "https://i.loli.net/2021/05/19/lVPgZ6NEGUv7k3q.png",
    },
  },
  {
    id: 2,
    on_sale: false,
    stock_number: 2,
    price: null,
    user: {
      id: 2,
      name: "哈哈哈",
      avatar: "https://i.loli.net/2021/05/19/lVPgZ6NEGUv7k3q.png",
    },
  },
];

export default defineComponent({
  components: { StockItemOwnerInfo },
  setup() {
    const data = ref(testData);

    return { data };
  },
});
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  background: #ffffff;
  border-radius: 16rpx;
  padding: 48rpx;
}
</style>
