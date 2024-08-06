import { IMessage, messageStore, roomStore } from '@entities';
import { messageService, socketService } from '@shared/api/services';
import { useEffect, useRef } from 'react';

function useMessages() {
  const containerRef = useRef(null);

  useEffect(() => {
    socketService.onMessageEvent<IMessage>((messageEvent) =>
      messageStore.saveMessage(messageEvent.message),
    );
  }, [socketService.channel?.subscribed]);

  useEffect(() => {
    async function fetcher() {
      socketService.subscribeToRoom(roomStore.activeRoom?.id);
      const { messages } = await messageService.getMessages<IMessage>(roomStore.activeRoom?.id);
      messageStore.messagesFetchingSuccess(messages);
    }

    messageStore.messagesFetchingInProgress();
    fetcher();
  }, [roomStore.activeRoom?.id]);

  useEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageStore.messages]);

  return { containerRef };
}

export default useMessages;
