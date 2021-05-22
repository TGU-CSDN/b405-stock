<template>
  <div class="list">
    <StockItem
      v-for="item in list"
      :key="item._id"
      :data="item"
      class="list__item"
      @tap="handleClick(item)"
    />
  </div>
</template>

<script lang="ts">
import { IStockItem } from "@/types/StockItem";
import { navigateTo } from "@/utils/helper";
import { defineComponent, PropType } from "vue";
import StockItem from "../StockItem/index.vue";

export default defineComponent({
  components: { StockItem },
  props: {
    list: {
      type: Object as PropType<Array<IStockItem>>,
      default: [],
    },
  },
  setup() {
    function handleClick(item: IStockItem) {
      navigateTo("/pages/stockItemDetail/index", { id: item._id });
    }

    return { handleClick };
  },
});
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
