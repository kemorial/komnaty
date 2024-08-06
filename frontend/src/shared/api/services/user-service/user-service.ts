import instance from '@shared/api/axios-instance';
import { user_service_constants as constants } from '../constants';

export interface GetUsersResponse<T> {
  users: T[];
}
export interface LoginErrorResponse {
  message: string;
}

class UserService {
  async getUsers<T>(): Promise<GetUsersResponse<T>> {
    const response = await instance.get(constants.USERS_PATH);
    return response.data;
  }
}

export default new UserService();
