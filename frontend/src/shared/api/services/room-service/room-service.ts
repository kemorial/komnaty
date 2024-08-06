import { IUser } from '@entities';
import instance from '@shared/api/axios-instance';
import { room_service_constants as constants } from '../constants';

export interface GetMyRoomsResponse<T> {
  rooms: T[];
}

export interface NewRoomResponse<T> {
  room: T;
}
export interface GetMeResponse {
  user: IUser;
}
class AuthService {
  async getMyRooms<T>(): Promise<GetMyRoomsResponse<T>> {
    const response = await instance.get(constants.MY_ROOMS_PATH);
    return response.data;
  }

  async newRoom<T extends object>(room: { title: string }): Promise<NewRoomResponse<T>> {
    const response = await instance.post(constants.MY_ROOMS_PATH, room);
    return response.data;
  }

  async findRooms<T extends object>(title: string): Promise<GetMyRoomsResponse<T>> {
    const response = await instance.get(`${constants.MY_ROOMS_SEARCH_PATH}=${title}`);
    return response.data;
  }

  async addUsersToRoom<T>(roomId: number, body: { users: T[] }) {
    const response = await instance.post(`${constants.MY_ROOMS_PATH}/${roomId}`, body);
    return response.data;
  }

  async deleteRoom(roomId: number) {
    const response = await instance.delete(`${constants.MY_ROOMS_PATH}/${roomId}`);
    return response.data;
  }
}

export default new AuthService();
