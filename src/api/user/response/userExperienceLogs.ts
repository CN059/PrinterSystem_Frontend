import type { PaginatedResponse } from '@/api/types';
import type { UserExperienceLogResponse } from './userExperienceLog';

export type ListExperienceLogsResponse = PaginatedResponse<UserExperienceLogResponse>;
