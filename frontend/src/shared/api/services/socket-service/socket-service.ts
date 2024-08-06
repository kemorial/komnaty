import pusherJs, { Channel } from 'pusher-js';
import Pusher from 'pusher-js/types/src/core/pusher';

interface MessageEvent<T> {
  message: T;
}

class SoketService {
  pusher: Pusher | undefined = undefined;
  channel: Channel | undefined = undefined;

  async connect() {
    const pusher = new pusherJs(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
      // @ts-ignore
      appId: import.meta.env.VITE_PUSHER_APP_ID,
      key: import.meta.env.VITE_PUSHER_API_KEY,
      secret: import.meta.env.VITE_PUSHER_SECRET,
      wsHost: import.meta.env.VITE_PUSHER_HOST,
      wsPort: import.meta.env.VITE_PUSHER_PORT,
      forceTLS: false,
      encrypted: false,
      disableStats: true,
      enabledTransports: ['ws'],
    });

    this.pusher = pusher;
  }

  subscribeToRoom = (roomId: number | undefined) => {
    if (this.channel) {
      if (`room_channel_${roomId}` === this.channel?.name)
        return console.log('already subscribed to', this.channel?.name);
      else this.unsubscribeChannel();
    }
    this.channel = this.pusher?.subscribe(`room_channel_${roomId}`);
    console.log('subscribe to', this.channel?.name);
  };

  onMessageEvent = <T>(onMessageEvent: (messageEvent: MessageEvent<T>) => void) => {
    if (!this.channel?.subscribed) return;

    this.channel?.bind('message_event', (messageEvent: MessageEvent<T>) => {
      console.log('fire event', messageEvent);
      onMessageEvent(messageEvent);
    });
  };

  async unsubscribeChannel() {
    console.log('unsubscribe', this.channel?.name);
    this.channel?.unsubscribe();
    this.channel = undefined;
  }
}

export default new SoketService();
