<template>
  <view class="edit">
    <view class="form">
      <ImageUploader
        :photos="stockItemPhoto"
        @change="handlePhotoChange"
      />
      <UInput
        v-model="stockItemName"
        placeholder="请输入货品名"
        label="货品名"
      />
      <UInput
        v-model="stockItemCode"
        placeholder="点击扫描条形码"
        label="条形码"
        disabled
        @tap="handleScanCode"
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
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import ImageUploader from "@/components/ImageUploader/index.vue";
import UInput from "@/components/UInput/index.vue";
import UButton from "@/components/UButton/index.vue";
import {
  hideLoading,
  navigateBack,
  showLoading,
  showToast,
} from "@/utils/helper";
import { IStockItem, IStockItemWithInfo } from "@/types/StockItem";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";
import { useStore } from "vuex";

const editID = ref("");
const fileList: Ref<Array<string>> = ref([]);
const stockItemName = ref("");
const stockItemCode = ref("");

async function getItemData() {
  showLoading();
  const res: any = await wx.cloud.callFunction({
    name: "get_stock_item",
    data: {
      _id: editID.value,
    },
  });
  const data: IStockItemWithInfo = res.result.data;
  fileList.value = [data.image];
  stockItemName.value = data.name;
  stockItemCode.value = data.code;
  hideLoading();
}

export default defineComponent({
  components: { ImageUploader, UInput, UButton },
  setup() {
    const store = useStore();
    const isLoading = ref(false);

    const stockItemPhoto = computed(() => {
      return fileList.value && fileList.value.length ? [fileList.value[0]] : [];
    });

    function handlePhotoChange(photoList: Array<string>) {
      fileList.value = photoList;
    }

    async function handleScanCode() {
      try {
        const res: any = await uni.scanCode({
          onlyFromCamera: true,
          scanType: ["barCode"],
        });
        stockItemCode.value = res.result;
        showToast("识别成功", "success");
      } catch (e) {
        showToast("扫码失败");
      }
    }

    async function handleSave() {
      if (!fileList.value.length) {
        showToast("请上传图片");
        return;
      }
      if (!stockItemName.value.trim()) {
        showToast("请输入货品名");
        return;
      }
      if (!stockItemCode.value.trim()) {
        showToast("请输入条形码");
        return;
      }

      const data: IStockItem = {
        _id: editID.value,
        image: fileList.value[0],
        name: stockItemName.value,
        code: stockItemCode.value,
      };

      try {
        isLoading.value = true;
        await wx.cloud.callFunction({
          name: "edit_stock_item",
          data,
        });
        showToast("保存成功", "success");
        store.dispatch(ActionTypes.getStockList);
        navigateBack();
      } catch (e) {
        showToast("保存失败");
      }
      isLoading.value = false;
    }

    return {
      stockItemName,
      stockItemCode,
      stockItemPhoto,
      handlePhotoChange,
      handleSave,
      handleScanCode,
      isLoading,
    };
  },
  onLoad(query: { id: string }) {
    editID.value = query.id;
    if (editID.value) {
      getItemData();
      uni.setNavigationBarTitle({
        title: "编辑货品信息",
      });
    }
  },
  onUnload() {
    fileList.value = [];
    stockItemName.value = "";
    stockItemCode.value = "";
  },
});
</script>

<style lang="scss" scoped>
.edit {
  padding: 32rpx;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action {
  margin-top: 64rpx;
  display: flex;
  justify-content: center;
}
</style>
