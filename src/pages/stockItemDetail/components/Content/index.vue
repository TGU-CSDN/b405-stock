<template>
  <view class="content">
    <view class="tabs">
      <UTabs
        active-color="#197ae5"
        :current="currentTab"
        :tabs="tabs"
        :min-width="325"
        @change="handleTabChange"
      />
    </view>
    <view
      v-if="currentTab===0"
      class="owner-info"
    >
      <StockItemOwnerInfo
        v-for="item in tdata"
        :key="item.id"
        :data="item"
      />
    </view>
    <view
      v-if="currentTab===1"
      class="my-stock"
    >
      <MyStock :data="data" />
    </view>
  </view>
</template>

<script lang="ts">
import { IStockItemWithInfo, IStockItemOwnerInfo } from "@/types/StockItem";
import { defineComponent, PropType, ref } from "vue";
import StockItemOwnerInfo from "./StockItemOwnerInfo.vue";
import MyStock from "./MyStock.vue";
import UTabs from "@/components/UTabs/index.vue";

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
  components: { StockItemOwnerInfo, MyStock, UTabs },
  props: {
    data: {
      type: Object as PropType<IStockItemWithInfo>,
      default: null,
    },
  },
  setup() {
    const tdata = ref(testData);
    const currentTab = ref(0);
    const tabs = ["库存列表", "我的库存"];

    function handleTabChange(index: number) {
      currentTab.value = index;
    }

    return { tdata, currentTab, tabs, handleTabChange };
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

.tabs {
  margin-bottom: 48rpx;
}
</style>
