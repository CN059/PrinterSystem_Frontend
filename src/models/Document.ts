// src/models/Document.ts
export interface Document {
  id: number;
  originalName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  pages: number;
  uploadTime: string; // ISO 8601 格式 datetime
}
