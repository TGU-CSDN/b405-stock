<template>
  <view class="stock-item-detail">
    <view v-if="stockItemData">
      <view class="top">
        <Top :data="stockItemData" />
      </view>
      <view class="content">
        <Content :data="stockItemData" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { IStockItem, IStockItemWithInfo } from "@/types/StockItem";
import { defineComponent, ref } from "vue";
import Top from "./components/Top/index.vue";
import Content from "./components/Content/index.vue";

const stockItemID = ref("");
const stockItemData = ref(null);

async function getItemData() {
  const res: any = await wx.cloud.callFunction({
    name: "get_stock_item",
    data: {
      _id: stockItemID.value,
    },
  });
  stockItemData.value = res.result.data;
}

export default defineComponent({
  components: { Top, Content },
  setup() {
    return {
      stockItemData,
    };
  },
  onLoad(query: { id: string }) {
    stockItemID.value = query.id;
  },
  onShow() {
    getItemData();
  },
});
</script>

<style lang="scss" scoped></style>
