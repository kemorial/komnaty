import { roomStore } from '@entities';
import { AddUsersInRoomSidebar, ChatInput, MessagesArea } from '@features';
import { observer } from 'mobx-react';
import styles from './Chat.module.css';
import ChatHeader from './ui/ChatHeader/ChatHeader';

function Chat() {
  if (!roomStore.activeRoom) return null;

  return (
    <div className={styles.container}>
      <ChatHeader />
      <MessagesArea />
      <ChatInput />
      <AddUsersInRoomSidebar />
    </div>
  );
}

export default observer(Chat);
