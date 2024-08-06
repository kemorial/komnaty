import { IconButton } from '@shared/ui';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { IRoom } from '../../model/room.model';
import roomStore from '../../store/room-store';
import styles from './Room.module.css';

function clip(str: string, len: number = 25) {
  const postfix = str.length > len ? '...' : '';
  return str.slice(0, len) + postfix;
}

interface Props {
  room: IRoom;
  isDeleting?: boolean;
  onDelete?: (roomId: number) => void;
}

function Room({ room, isDeleting = false, onDelete }: Props) {
  const onRoom = () => {
    if (isDeleting) return;
    window.innerWidth <= 768 && roomStore.hideRoomSidebar();
    roomStore.setActiveRoom(room);
  };

  const isActive = room.id === roomStore.activeRoom?.id;
  const className = `${styles.room} ${isActive && styles.active}`;

  return (
    <div onClick={onRoom} className={className}>
      <div className={styles.room_img}>
        <div>{room.title?.at(0)?.toUpperCase()}</div>
      </div>
      <div className={styles.room_descr}>
        <div className={styles.room_title + ' ' + styles.clip}>{clip(room.title)}</div>
        <div className={styles.room_lastmessage + ' ' + styles.clip}>{clip(room.last_message)}</div>
      </div>
      <div className={styles.room_lastmessage_time}>
        {isDeleting ? (
          //@ts-ignore
          <IconButton
            color='error'
            //@ts-ignore
            onClick={() => onDelete(room.id)}
            icon={<MdOutlineDeleteForever />}
          />
        ) : (
          dayjs(room.last_message_time || Date.now()).format('HH:mm')
        )}
      </div>
    </div>
  );
}

export default observer(Room);
