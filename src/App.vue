<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { ActionTypes } from "./enums/actionTypes";

async function checkProfile() {
  const res: any = await wx.cloud.callFunction({
    name: "check_profile",
  });
  if (res.result.hasProfile) {
    store.dispatch(ActionTypes.login, false);
  }
}

export default defineComponent({
  onLaunch() {
    console.log("App Launch");
    checkProfile();
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
});
</script>

<style lang="scss">
@import "./styles/ionfont.scss";
@import "./styles/common.scss";

page {
  background-color: $uni-bg-color;
}
<style>
