// src/api/file/response/DocumentListResponse.ts
import type { Document } from '@/models/Document';

export interface GetDocumentListResponseData {
  total: number;
  page: number;
  size: number;
  documents: Document[];
}
