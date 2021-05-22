<template>
  <div
    class="menu-item item"
    @tap="handleClick"
  >
    <div class="item__icon">
      <uni-icons
        v-if="icon"
        :type="icon"
        size="20"
        color="#999999"
      />
    </div>
    <div class="item__title">
      {{ title }}
    </div>
    <div class="item__arrow">
      <uni-icons
        type="arrowright"
        size="20"
        color="#999999"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { navigateTo } from "@/utils/helper";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    function handleClick() {
      if (props.path) {
        navigateTo(props.path);
      }
    }

    return { handleClick };
  },
});
</script>

<style lang="scss" scoped>
.menu-item {
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx 36rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 16rpx;
  box-shadow: 0rpx 2rpx 4rpx 2rpx rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  align-items: center;

  &__title {
    margin-left: 8rpx;
    flex: 1;
  }

  &__arrow {
    position: relative;
    left: 8rpx;
  }
}
</style>
