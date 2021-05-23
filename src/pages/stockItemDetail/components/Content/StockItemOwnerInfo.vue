<template>
  <div class="owner-info item">
    <image
      class="item__avatar"
      :src="data.user.avatar_url"
    />
    <div class="item__desc">
      <div class="item__desc__name">
        {{ data.user.username }}
      </div>
      <div class="item__desc__stock">
        拥有 {{ data.number }} 件
      </div>
    </div>
    <div class="item__action">
      <UButton
        v-if="data.price"
        type="primary"
        custom-style="padding: 0 32rpx 0 30rpx"
        :loading="isLoading"
        @click="handleBuy"
      >
        ￥{{ data.price.toFixed(2) }}
      </UButton>
      <UButton
        v-else
        type="primary"
        disabled
        custom-style="padding: 0 30rpx"
      >
        不出售
      </UButton>
    </div>
  </div>
</template>

<script lang="ts">
import { IStockItemOwnerInfo } from "@/types/StockItem";
import { defineComponent, PropType, ref } from "vue";
import UButton from "@/components/UButton/index.vue";
import { showModal, showToast } from "@/utils/helper";

export default defineComponent({
  components: { UButton },
  props: {
    data: {
      type: Object as PropType<IStockItemOwnerInfo>,
      default: null,
    },
  },
  emits: ["update"],
  setup(props, { emit }) {
    const isLoading = ref(false);

    async function handleBuy() {
      try {
        await showModal(
          `￥${props.data.price!.toFixed(2)}`,
          "是否确认核销该货品？",
          true
        );

        isLoading.value = true;

        await wx.cloud.callFunction({
          name: "buy_stock_item",
          data: {
            stock_owner_id: props.data._id,
          },
        });

        await showModal("成功", "核销成功");
        emit("update");
      } catch (e) {}

      isLoading.value = false;
    }

    return { isLoading, handleBuy };
  },
});
</script>

<style lang="scss" scoped>
.owner-info {
  width: 100%;
  margin-bottom: 36rpx;
}

.item {
  display: flex;
  align-items: center;

  &__avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 100%;
  }

  &__desc {
    margin-left: 16rpx;
    flex: 1;
    &__name {
      font-size: $uni-font-size-lg;
    }
    &__stock {
      margin-top: 2rpx;
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
  }
}
</style>
