<template>
  <view class="content">
    <StockList :list="list" />
  </view>
</template>

<script lang="ts">
import { IStockItemWithInfo } from "@/types/StockItem";
import { defineComponent, ref } from "vue";
// import { navigateTo } from "@/utils/helper";
import StockList from "@/components/StockList/index.vue";

const testList: Array<IStockItemWithInfo> = [
  {
    _id: "1",
    name: "可口可乐",
    image: "https://i.loli.net/2021/05/19/lVPgZ6NEGUv7k3q.png",
    code: "114514",
    stock_number: 9,
    stock_list: [],
  },
  {
    _id: "2",
    name: "百事可乐",
    image: "https://i.loli.net/2021/05/19/lVPgZ6NEGUv7k3q.png",
    code: "11451499",
    stock_number: 3,
    stock_list: [],
  },
  {
    _id: "3",
    name: "百事可乐",
    image: "https://i.loli.net/2021/05/19/lVPgZ6NEGUv7k3q.png",
    code: "114514990",
    stock_number: 7,
    stock_list: [],
  },
];

export default defineComponent({
  components: { StockList },
  setup() {
    const list = ref(testList);

    return { list };
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
