<template>
  <v-file-input
    v-model="file"
    :label="label"
    :accept="accept"
    :max-size="maxSize"
    show-size
    counter
    clearable
    prepend-inner-icon="mdi-paperclip"
    @change="onFileChange"
  >
    <!-- 上传按钮：关键是 .stop -->
    <template #append-inner>
      <v-btn
        color="primary"
        size="small"
        :disabled="!file || isUploading"
        :loading="isUploading"
        @click.stop="upload"
      >
        上传
      </v-btn>
    </template>
  </v-file-input>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { uploadFile } from "@/api/file";
import type { UploadFileResponseData } from "@/api/file/response/UploadResponse";
import { useNotification } from "@/plugins/notification";

const notify = useNotification();

// Props
interface Props {
  label?: string;
  accept?: string;
  maxSize?: number; // 字节
}

const props = withDefaults(defineProps<Props>(), {
  label: "选择要上传的打印文件",
  accept: ".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png",
  maxSize: 50 * 1024 * 1024, // 50MB
});

// Emit
const emit = defineEmits<{
  (e: "success", data: UploadFileResponseData): void;
  (e: "error", message: string): void;
}>();

// 状态
const file = ref<File | null>(null);
const isUploading = ref(false);

// 文件变化钩子（可用于自动上传等）
const onFileChange = (newFile: File | null) => {
  // 可在此做轻量提示或日志
  console.log("[File] 选择文件:", newFile?.name);
};

// 上传逻辑
const upload = async () => {
  if (!file.value) return;

  isUploading.value = true;
  const formData = new FormData();
  formData.append("file", file.value);

  try {
    const result = await uploadFile(formData);
    notify.success("文件上传成功！");
    emit("success", result);
  } catch (err: any) {
    const msg = err.message || "上传失败";
    notify.error(msg);
    emit("error", msg);
  } finally {
    isUploading.value = false;
  }
};
</script>
