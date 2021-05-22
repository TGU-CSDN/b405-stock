<template>
  <view class="stock-item-detail">
    <view class="top">
      <Top :data="stockItemData" />
    </view>
    <view class="content">
      <Content :data="stockItemData" />
    </view>
  </view>
</template>

<script lang="ts">
import { IStockItem, IStockItemWithInfo } from "@/types/StockItem";
import { defineComponent, ref } from "vue";
import Top from "./components/Top/index.vue";
import Content from "./components/Content/index.vue";

const testData: IStockItemWithInfo = {
  _id: "2",
  name: "百事可乐",
  image: "https://i.loli.net/2021/05/19/lVPgZ6NEGUv7k3q.png",
  code: "11451499",
  stock_number: 3,
  stock_list: [
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
  ],
};

export default defineComponent({
  components: { Top, Content },
  setup() {
    const stockItemData = ref(testData);

    return {
      stockItemData,
    };
  },
});
</script>

<style lang="scss" scoped></style>
