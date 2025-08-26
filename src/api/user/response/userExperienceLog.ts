export interface UserExperienceLogResponse {
  id: number;
  user_id: number;
  experience_change: number;
  reason: string;
  related_id: number | null;
  created_at: string;
}
