<template>
  <view>
    <Top />
    <view>
      <Content />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Top from "./components/Top/index.vue";
import Content from "./components/Content/index.vue";

export default defineComponent({
  components: { Top, Content },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
