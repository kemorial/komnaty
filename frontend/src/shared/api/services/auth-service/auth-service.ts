import instance from '@shared/api/axios-instance';
import { AxiosError } from 'axios';
import { auth_service_constants as constants } from '../constants';

export interface LoginResponse<T> {
  user: T;
  access_token: string;
}
export interface LoginErrorResponse {
  message: string;
}

class AuthService {
  async login<T extends object>(user: T): Promise<LoginResponse<T>> {
    const response = await instance.post(constants.LOGIN_PATH, user);
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    return response.data;
  }

  async registration<T extends object>(user: T) {
    return instance.post(constants.REGISTRATION_PATH, user);
  }

  async getMe<T>(): Promise<T> {
    const response = await instance.get(constants.GET_ME_PATH);
    return response.data;
  }

  parseMessageError(error: AxiosError | Error) {
    const axiosError = error as AxiosError;
    const axiosErrorData: LoginErrorResponse = axiosError?.response?.data as LoginErrorResponse;
    const message = axiosErrorData?.message || (error as Error)?.message;
    return message;
  }
}

export default new AuthService();
