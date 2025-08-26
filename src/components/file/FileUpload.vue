<template>
  <v-file-input
    v-model="selectedFile"
    :label="label"
    :accept="accept"
    :max-size="maxSize"
    :error-messages="errorMessages"
    show-size
    counter
    clearable
    prepend-icon=""
    prepend-inner-icon="mdi-paperclip"
  >
    <!-- 按钮 -->
    <template #append-inner>
      <v-btn
        color="primary"
        :disabled="!selectedFile || isUploading"
        :loading="isUploading"
        @click="upload"
        size="small"
      >
        上传
      </v-btn>
    </template>
  </v-file-input>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { uploadFile } from "@/api/file";
import type { UploadFileResponseData } from "@/api/file/response/UploadResponse";
import type { ApiResponse } from "@/api/types";

interface Props {
  label?: string;
  accept?: string;
  maxSize?: number;
  autoUpload?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  label: "选择要上传的打印文件",
  accept: ".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png",
  maxSize: 50 * 1024 * 1024, // 50MB
  autoUpload: false,
});

const emit = defineEmits<{
  (e: "success", file: UploadFileResponseData): void;
  (e: "error", message: string): void;
  (e: "upload-start"): void;
  (e: "upload-end"): void;
}>();

// ========== 状态 ========== //
const selectedFile = ref<File | null>(null);
const isUploading = ref(false);
const uploadSuccess = ref(false);
const uploadError = ref<string | null>(null);
const uploadedFileName = ref<string>("");
const errorMessages = ref<string[]>([]);

// ========== 方法 ========== //

const logState = (stage: string) => {
  console.group(`📁 [FileUpload] ${stage}`);
  console.log("selectedFile.value:", selectedFile.value);
  if (selectedFile.value) {
    console.log("→ File name:", selectedFile.value.name);
    console.log("→ File size:", selectedFile.value.size, "bytes");
    console.log("→ File type:", selectedFile.value.type);
    console.log("→ File instanceof File:", selectedFile.value instanceof File);
    try {
      console.log("→ File constructor:", selectedFile.value.constructor.name);
    } catch (e) {}
  } else {
    console.warn("→ selectedFile.value is null or falsy");
  }
  console.log("isUploading:", isUploading.value);
  console.log("uploadSuccess:", uploadSuccess.value);
  console.log("uploadError:", uploadError.value);
  console.groupEnd();
};
interface Props {
  label?: string;
  accept?: string;
  maxSize?: number;
  autoUpload?: boolean;
}
// ✅ 使用 watch 监听文件变化
watch(selectedFile, async (file) => {
  errorMessages.value = [];
  if (!file) return;
  if (!(file instanceof File)) {
    console.error("❌ 非 File 对象:", file);
    errorMessages.value.push("文件类型错误");
    selectedFile.value = null;
    return;
  }
  if (file.size > props.maxSize) {
    const maxSizeMB = (props.maxSize / 1024 / 1024).toFixed(1);
    errorMessages.value.push(`文件大小不能超过 ${maxSizeMB}MB`);
    selectedFile.value = null;
    return;
  }
  uploadedFileName.value = file.name;
  if (props.autoUpload) {
    await upload(); // 注意：如果 autoUpload，考虑是否要防抖
  }
});

const upload = async () => {
  console.log("🚀 [upload] 开始执行");
  logState("upload 开始");

  if (!selectedFile.value) {
    const msg = "❌ 上传失败：selectedFile.value 为 null";
    console.error(msg);
    uploadError.value = "未选择文件";
    emit("error", "未选择文件");
    return;
  }

  const file = selectedFile.value;

  if (!(file instanceof File)) {
    const msg = `❌ 上传失败：selectedFile.value 不是 File 实例，类型为 ${typeof file}`;
    console.error(msg, file);
    uploadError.value = "文件类型错误，无法上传";
    emit("error", "文件类型错误");
    return;
  }

  console.log(
    `📄 [upload] 即将上传：${file.name} (${file.size} bytes, ${file.type})`
  );

  isUploading.value = true;
  uploadSuccess.value = false;
  uploadError.value = null;
  uploadedFileName.value = file.name;

  emit("upload-start");

  const formData = new FormData();
  formData.append("file", file, file.name); // 第三个参数 filename（可选但推荐）
  console.log("📦 [FormData] 已构建，准备上传");
  console.log("🔍 FormData 内容检查:");
  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}:`, value);
  }

  try {
    const response = await uploadFile(formData);
    console.log("✅ [upload] 请求成功，response:", response);

    if (!response.ifSuccess || !response.data) {
      throw new Error(response.response || "上传失败：响应数据异常");
    }

    const fileData = response.data as UploadFileResponseData;

    if (!fileData?.id || !fileData.originalName) {
      throw new Error("上传返回数据不完整：缺少 id 或 originalName");
    }

    console.log("🎉 [upload] 文件上传成功！", fileData);
    uploadSuccess.value = true;
    emit("success", fileData);
  } catch (err: any) {
    let msg = err.message || "上传失败，请检查网络或文件格式";

    // 更详细错误日志
    console.error("❌ [upload] 上传失败，错误详情：", err);
    if (err.response) {
      console.error("→ 响应数据:", err.response);
      console.error("→ 状态码:", err.response.status);
      console.error("→ 返回内容:", err.response.data);
      msg = err.response.data?.response || msg;
    } else if (err.request) {
      console.error("→ 无响应：请求已发出但未收到响应", err.request);
    } else {
      console.error("→ 其他错误:", err);
    }

    uploadError.value = msg;
    emit("error", msg);
  } finally {
    isUploading.value = false;
    console.log("🔚 [upload] 执行结束，isUploading = false");
    emit("upload-end");
  }
};
</script>

<style scoped>
.file-upload-component {
  width: 100%;
}
</style>
