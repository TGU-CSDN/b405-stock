<template>
  <view class="empty">
    <uni-icons
      type="info"
      size="64"
      color="#979797"
    />
    <view class="empty-text">
      {{ message }}
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $uni-text-color-grey;
  padding: 30rpx 0;

  &-text {
    margin-top: 10rpx;
    font-size: $uni-font-size-base;
  }
}
</style>
