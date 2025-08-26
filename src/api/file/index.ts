// src/api/file/index.ts
import apiClient from '@/api/client';

// 请求类型
import type {
  GetDocumentListRequest,
} from '@/api/file/request/list';
import type {
  GetDocumentDetailRequest,
} from '@/api/file/request/detail';
import type {
  DeleteDocumentRequest,
} from '@/api/file/request/delete';

// 响应类型
import type { UploadFileResponseData } from '@/api/file/response/UploadResponse';
import type { GetDocumentListResponseData } from '@/api/file/response/DocumentListResponse';
import type { GetDocumentDetailResponseData } from '@/api/file/response/DocumentDetailResponse';
import type { DeleteDocumentResponseData } from '@/api/file/response/DeleteResponse';

// ✅ 返回的是 UploadFileResponseData 而不是 ApiResponse<...>
export const uploadFile = (
  formData: FormData
): Promise<UploadFileResponseData> => {
  return apiClient.post('/file/upload', formData);
  // 拦截器已剥壳，返回的就是 data 字段
};

export const getDocumentList = (
  payload: GetDocumentListRequest
): Promise<GetDocumentListResponseData> => {
  return apiClient.post('/file/list', payload);
};

export const getDocumentDetail = (
  payload: GetDocumentDetailRequest
): Promise<GetDocumentDetailResponseData> => {
  return apiClient.post('/file/detail', payload);
};

export const deleteDocument = (
  payload: DeleteDocumentRequest
): Promise<DeleteDocumentResponseData> => {
  return apiClient.post('/file/delete', payload);
};

export default {
  uploadFile,
  getDocumentList,
  getDocumentDetail,
  deleteDocument,
};
