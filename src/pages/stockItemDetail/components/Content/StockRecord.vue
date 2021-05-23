<template>
  <view class="stock-record">
    <view class="table">
      <uni-table
        border
        stripe
        empty-text="暂无更多数据"
      >
        <!-- 表头行 -->
        <uni-tr>
          <uni-th
            align="center"
            width="90"
          >
            时间
          </uni-th>
          <uni-th
            align="center"
            width="90"
          >
            操作
          </uni-th>
          <uni-th
            align="center"
            width="50"
          >
            原库存
          </uni-th>
          <uni-th
            align="center"
            width="50"
          >
            新库存
          </uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr
          v-for="item in data"
          :key="item._id"
        >
          <uni-td align="center">
            {{ parseDateTime(item.time) }}
          </uni-td>
          <uni-td align="center">
            {{ `被 ${item.operator_user.username}` }}
            <br>
            {{ getActionText(item.action_type) }}
          </uni-td>
          <uni-td align="center">
            {{ item.old_number }}
          </uni-td>
          <uni-td align="center">
            {{ item.new_number }}
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script lang="ts">
import { IStockRecord } from "@/types/StockItem";
import { defineComponent, PropType } from "vue";
import { useTime } from "@/uses/useTime";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Array<IStockRecord>>,
      default: null,
    },
  },
  setup() {
    function getActionText(actionType: string) {
      const map = {
        buy: "核销",
        edit: "修改库存",
      };

      // @ts-ignore
      return map[actionType];
    }

    return { getActionText, ...useTime() };
  },
});
</script>
