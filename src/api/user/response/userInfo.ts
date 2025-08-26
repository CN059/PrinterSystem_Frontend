export interface UserInfoResponse {
  id: number;
  username: string;
  email: string;
  phone: string | null;
  nickname: string;
  avatar: string;
  user_level: number;
  experience: number;
  status: number;
  created_at: string;
  updated_at: string;
}
