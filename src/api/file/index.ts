// src/api/file/index.ts
import apiClient from '@/api/client';
import type { ApiResponse } from '@/api/types';

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

export const uploadFile = (
  formData: FormData
): Promise<ApiResponse<UploadFileResponseData>> => {
  return apiClient.post("/file/upload", formData);
};


export const getDocumentList = async (
  payload: GetDocumentListRequest
): Promise<ApiResponse<GetDocumentListResponseData>> => {
  return await apiClient.post('/file/list', payload);
};

export const getDocumentDetail = async (
  payload: GetDocumentDetailRequest
): Promise<ApiResponse<GetDocumentDetailResponseData>> => {
  return await apiClient.post('/file/detail', payload);
};

export const deleteDocument = async (
  payload: DeleteDocumentRequest
): Promise<ApiResponse<DeleteDocumentResponseData>> => {
  return await apiClient.post('/file/delete', payload);
};

export default {
  uploadFile,
  getDocumentList,
  getDocumentDetail,
  deleteDocument,
};
