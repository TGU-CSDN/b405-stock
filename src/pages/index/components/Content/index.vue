<template>
  <view class="content">
    <StockList :list="list" />
  </view>
</template>

<script lang="ts">
import { IStockItemWithInfo } from "@/types/StockItem";
import { computed, defineComponent, ref } from "vue";
// import { navigateTo } from "@/utils/helper";
import StockList from "@/components/StockList/index.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { StockList },
  setup() {
    const store = useStore();

    const list = computed(() => {
      return store.getters.stockList;
    });

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
