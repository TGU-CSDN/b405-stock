<template>
  <view class="body">
    <view
      v-for="item in photos"
      :key="item"
      class="item"
    >
      <image
        class="item item-image"
        :src="item"
        mode="aspectFill"
        @click="handlePreviewPhoto(item)"
      />
      <view
        class="item-remove"
        @click="handleRemovePhoto(item)"
      >
        <uni-icons
          type="closeempty"
          size="25"
          color="#ffffff"
        />
      </view>
    </view>
    <view
      v-if="photos.length < maxUpload"
      class="item item-add"
      @click="handleAddPhoto"
    >
      <uni-icons
        type="camera"
        size="40"
        color="#979797"
      />
      <view class="item-add-label">
        {{ label }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { showLoading, hideLoading, showModalError } from "@/utils/helper";

const uploadImage = async (filePath: string) => {
  const fileInfo: any = await uni.getFileInfo({
    filePath,
  });
  const fileMD5 = fileInfo.digest;
  const reg = filePath.match(/\.[^.]+?$/);
  const fileExt = reg && reg.length ? reg[0] : "";

  const cloudPath = "ugc/image/" + fileMD5 + fileExt;

  const uploadRes = await wx.cloud.uploadFile({
    cloudPath, // 上传至云端的路径
    filePath, // 小程序临时文件路径
  });

  return uploadRes.fileID;
};

export default defineComponent({
  props: {
    photos: {
      type: Array as PropType<Array<string>>,
      default: () => {
        return [];
      },
    },
    maxUpload: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: "请上传图片",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const handleAddPhoto = async () => {
      uni.chooseImage({
        count: 1,
        success: async (res) => {
          showLoading("请稍候");
          try {
            // @ts-ignore
            const url: string = await uploadImage(res.tempFilePaths[0]);
            const newPhotoList = props.photos.slice(0);
            newPhotoList.push(url);
            emit("change", newPhotoList);
          } catch (e) {
            console.log(e);
            showModalError("上传图片失败");
          }
          hideLoading();
        },
      });
    };

    const handleRemovePhoto = (path: string) => {
      const index = props.photos.findIndex((url) => url === path);
      const newPhotoList = props.photos.slice(0);
      newPhotoList.splice(index, 1);
      emit("change", newPhotoList);
    };

    // 点击图片进行预览
    const handlePreviewPhoto = (path: string) => {
      uni.previewImage({
        urls: props.photos,
        current: props.photos.findIndex((url) => url === path).toString(),
      });
    };

    return { handleAddPhoto, handleRemovePhoto, handlePreviewPhoto };
  },
});
</script>

<style lang="scss" scoped>
.body {
  box-sizing: border-box;
  padding: 22rpx 32rpx;
  display: inline-flex;
}

.item {
  display: inline-block;
  width: 300rpx;
  height: 300rpx;
  border-radius: 10rpx;
  position: relative;

  & + & {
    margin-left: 32rpx;
  }

  &-remove {
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    width: 60rpx;
    height: 60rpx;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000;
    opacity: 0.5;
  }

  &-add {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2rpx solid #979797;

    &-label {
      font-size: 24rpx;
      font-weight: 400;
      color: #979797;
      line-height: 48rpx;
    }
  }
}
</style>
