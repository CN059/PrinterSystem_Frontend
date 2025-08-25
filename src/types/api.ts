// src/types/api.ts
export interface ApiResponse<T = unknown> {
  status: number
  response: string
  ifSuccess: boolean
  data: T
}
