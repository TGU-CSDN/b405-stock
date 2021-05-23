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
      v-show="currentTab===0"
      class="owner-info"
    >
      <StockItemOwnerInfo
        v-for="item in stockOwnersData"
        :key="item._id"
        :data="item"
      />
      <Empty
        v-if="!stockOwnersData || !stockOwnersData.length"
        message="无库存"
      />
    </view>
    <view
      v-show="currentTab===1"
      class="my-stock"
    >
      <MyStock
        :data="data"
        @update="handleUpdated"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { IStockItemWithInfo, IStockItemOwnerInfo } from "@/types/StockItem";
import { defineComponent, PropType, ref } from "vue";
import StockItemOwnerInfo from "./StockItemOwnerInfo.vue";
import MyStock from "./MyStock.vue";
import UTabs from "@/components/UTabs/index.vue";
import Empty from "@/components/Empty/index.vue";

export default defineComponent({
  components: { StockItemOwnerInfo, MyStock, UTabs, Empty },
  props: {
    data: {
      type: Object as PropType<IStockItemWithInfo>,
      default: null,
    },
    stockOwnersData: {
      type: Object as PropType<Array<IStockItemOwnerInfo>>,
      default: null,
    },
  },
  emits: ["update"],
  setup(props, { emit }) {
    const currentTab = ref(0);
    const tabs = ["库存列表", "我的库存"];

    function handleTabChange(index: number) {
      currentTab.value = index;
    }

    function handleUpdated() {
      emit("update");
    }

    return { currentTab, tabs, handleTabChange, handleUpdated };
  },
});
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx 48rpx;
}

.tabs {
  margin-bottom: 48rpx;
}
</style>
