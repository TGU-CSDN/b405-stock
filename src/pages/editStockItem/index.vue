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
import { navigateBack, showToast } from "@/utils/helper";
import { IStockItem } from "@/types/StockItem";

const editID = ref("");

export default defineComponent({
  components: { ImageUploader, UInput, UButton },
  setup() {
    const isLoading = ref(false);

    const fileList: Ref<Array<string>> = ref([]);
    const stockItemName = ref("");
    const stockItemCode = ref("");

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
        // TODO: refresh stock list
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
