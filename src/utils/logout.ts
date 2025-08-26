import { removeToken } from '@/utils/storage';
export const logout = () => {
  removeToken();
};
