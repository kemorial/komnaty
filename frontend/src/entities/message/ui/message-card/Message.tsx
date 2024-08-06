import { userStore } from '@entities';
import { IMessage } from '../../model/message.model';
import MessageBody from '../message-body/MessageBody';
import MessageHeader from '../message-header/MessageHeader';
import styles from './Message.module.css';

interface Props {
  message: IMessage;
}

function Message({ message }: Props) {
  const isMyMessage = userStore.user?.id === message.author_id;
  const className = `${isMyMessage ? styles.my : styles.other} ${styles.container}`;
  const dividerColor = isMyMessage ? 'var(--secondary-color)' : 'var(--primary-color)';

  return (
    <div className={className}>
      <MessageHeader
        isSaving={message.id < 0}
        author={message.author_username}
        created_at={message.created_at}
      />
      <div style={{ backgroundColor: `${dividerColor}` }} className={styles.divider}></div>
      <MessageBody body={message.body} />
    </div>
  );
}

export default Message;
