import { roomStore } from '@entities';
import { Block, IconButton } from '@shared/ui';
import { FaUserPlus } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styles from './ChatHeader.module.css';

function ChatHeader() {
  return (
    <Block containerClassName={styles.container} color='secondary'>
      <div className={styles.header}>
        <IconButton
          onClick={roomStore.showOrHideRoomSidebar}
          color='primary'
          size='lg'
          className={styles.hide}
          icon={<MdKeyboardArrowRight />}
        />
        <div className={styles.heading}>{roomStore.activeRoom?.title}</div>
      </div>
      <IconButton onClick={roomStore.showUsersSidebar} color='primary' icon={<FaUserPlus />} />
    </Block>
  );
}

export default ChatHeader;
