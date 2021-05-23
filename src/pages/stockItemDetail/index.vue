<template>
  <view class="stock-item-detail">
    <view v-if="stockItemData">
      <view class="top">
        <Top :data="stockItemData" />
      </view>
      <view class="content">
        <Content
          :data="stockItemData"
          :stock-owners-data="stockOwnersData"
          :stock-record-data="stockRecordData"
          @update="handleUpdated"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {
  IStockItemOwnerInfo,
  IStockItemWithInfo,
  IStockRecord,
} from "@/types/StockItem";
import { defineComponent, Ref, ref } from "vue";
import Top from "./components/Top/index.vue";
import Content from "./components/Content/index.vue";
import { showLoading, hideLoading } from "@/utils/helper";
import { useStore } from "vuex";
import { ActionTypes } from "@/enums/actionTypes";

const stockItemID = ref("");
const stockItemData: Ref<IStockItemWithInfo | null> = ref(null);
const stockOwnersData: Ref<Array<IStockItemOwnerInfo>> = ref([]);
const stockRecordData: Ref<Array<IStockRecord>> = ref([]);

async function getItemRecordData() {
  const res: any = await wx.cloud.callFunction({
    name: "get_my_stock_record",
    data: {
      stock_id: stockItemID.value,
    },
  });
  stockRecordData.value = res.result.data;
}

async function getItemOwnersData() {
  const res: any = await wx.cloud.callFunction({
    name: "get_stock_item_owners",
    data: {
      stock_id: stockItemID.value,
    },
  });
  stockOwnersData.value = res.result.data;
}

async function getItemData() {
  showLoading();
  const res: any = await wx.cloud.callFunction({
    name: "get_stock_item",
    data: {
      _id: stockItemID.value,
    },
  });
  stockItemData.value = res.result.data;
  await Promise.all([getItemRecordData(), getItemOwnersData()]);
  hideLoading();
}

export default defineComponent({
  components: { Top, Content },
  setup() {
    const store = useStore();

    function handleUpdated() {
      getItemData();
      store.dispatch(ActionTypes.getStockList);
    }

    return {
      stockItemData,
      stockOwnersData,
      stockRecordData,
      handleUpdated,
    };
  },
  onLoad(query: { id: string }) {
    stockItemID.value = query.id;
  },
  onShow() {
    getItemData();
  },
  onUnload() {
    stockItemID.value = "";
    stockItemData.value = null;
    stockOwnersData.value = [];
    stockRecordData.value = [];
  },
});
</script>

<style lang="scss" scoped></style>
