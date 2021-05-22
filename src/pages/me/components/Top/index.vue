<template>
  <div class="me-top">
    <div class="user">
      <div class="user__name">
        {{ logged ? profile.username : '未登录' }}
      </div>
      <image
        v-if="logged"
        class="user__avatar"
        mode="aspectFill"
        :src="profile.avatar_url"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { IUserProfile } from "@/types/User";
import { computed, ComputedRef, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const logged = computed(() => {
      return store.getters.logged;
    });

    const profile: ComputedRef<IUserProfile> = computed(() => {
      return store.getters.profile;
    });

    return { logged, profile };
  },
});
</script>

<style lang="scss" scoped>
.me-top {
  width: 100%;
  background-color: #197ae5;

  .user {
    display: flex;
    align-items: center;
    padding: 64rpx 64rpx 128rpx 64rpx;

    &__name {
      flex: 1;
      color: #ffffff;
      font-size: $uni-font-size-xxl;
    }
    &__avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 100%;
    }
  }
}
</style>
