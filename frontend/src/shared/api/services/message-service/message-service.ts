import instance from '@shared/api/axios-instance';
import { message_service_constants as constants } from '../constants';

export interface CreateMessageResponse<T> {
  message: T;
}

export interface GetMessagesResponse<T> {
  messages: T[];
}

class MessageService {
  async createMessage<T extends object>(message: {
    body: string;
    room_id?: number;
  }): Promise<CreateMessageResponse<T>> {
    const response = await instance.post(constants.MESSAGES_PATH, message);
    return response.data;
  }

  async getMessages<T extends object>(roomId: number | undefined): Promise<GetMessagesResponse<T>> {
    const response = await instance.get(`${constants.MESSAGES_PATH}/room/${roomId}`);
    return response.data;
  }
}

export default new MessageService();
