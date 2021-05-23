<template>
  <div class="my-stock">
    <view class="form">
      <UInput
        v-model="myStockNumberText"
        placeholder="请输入你的拥有数量"
        label="拥有数"
        type="number"
      />
      <UInput
        v-model="myStockPriceText"
        placeholder="请输入货品价格 (0为不出售)"
        label="价格"
        type="digit"
      />
    </view>
    <view class="action">
      <UButton
        type="primary"
        :loading="isLoading"
        @click="handleSave"
      >
        保存
      </UButton>
    </view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import { IStockItemWithInfo } from "@/types/StockItem";
import UInput from "@/components/UInput/index.vue";
import UButton from "@/components/UButton/index.vue";
import { showToast } from "@/utils/helper";

export default defineComponent({
  components: { UInput, UButton },
  props: {
    data: {
      type: Object as PropType<IStockItemWithInfo>,
      default: null,
    },
  },
  setup(props) {
    const isLoading = ref(false);
    const myStockNumberText = ref("0");
    const myStockPriceText = ref("0");

    async function getMyStockNumber() {
      const res: any = await wx.cloud.callFunction({
        name: "get_my_stock",
        data: {
          stock_id: props.data._id,
        },
      });
      const data = res.result.data;
      myStockNumberText.value = data.number.toString();
      myStockPriceText.value = data.price.toString();
    }

    onMounted(async () => {
      await getMyStockNumber();
    });

    async function handleSave() {
      try {
        isLoading.value = true;
        await wx.cloud.callFunction({
          name: "edit_my_stock",
          data: {
            stock_id: props.data._id,
            number: parseInt(myStockNumberText.value, 10),
            price: Number(myStockPriceText.value),
          },
        });
        showToast("保存成功", "success");
      } catch (e) {
        console.error(e);
      }
      isLoading.value = false;
      await getMyStockNumber();
    }

    return { myStockNumberText, myStockPriceText, handleSave, isLoading };
  },
});
</script>

<style lang="scss" scoped>
.action {
  margin-top: 64rpx;
  display: flex;
  justify-content: center;
}
</style>
