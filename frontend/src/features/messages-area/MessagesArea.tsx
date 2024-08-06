import { Message, messageStore } from '@entities';
import { Loader } from '@shared/ui';
import { observer } from 'mobx-react';
import styles from './MessagesArea.module.css';
import useMessages from './hooks/useMessages';

function MessagesArea() {
  const { containerRef } = useMessages();

  if (messageStore.isFetching) return <Loader width='40' height='40' />;

  return (
    <div ref={containerRef} className={styles.container}>
      {messageStore.messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default observer(MessagesArea);
