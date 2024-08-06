import { roomStore } from '@entities';
import { Block, IconButton } from '@shared/ui';
import { observer } from 'mobx-react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdKeyboardArrowLeft, MdOutlineDelete, MdOutlineDeleteSweep } from 'react-icons/md';
import styles from './MyRoomsHeader.module.css';

function MyRoomsHeader() {
  let iconPlusMinus = null;
  let iconDelete = null;

  if (!roomStore.isFetching && roomStore.isAddingNewRoom) {
    iconPlusMinus = (
      <IconButton
        color='secondary'
        onClick={roomStore.addingNewRoomCancel}
        icon={<AiOutlineMinus />}
      />
    );
  }

  if (!roomStore.isFetching && !roomStore.isAddingNewRoom) {
    iconPlusMinus = (
      <IconButton
        color='secondary'
        onClick={roomStore.addingNewRoomInProgress}
        icon={<AiOutlinePlus />}
      />
    );
  }

  if (!roomStore.isFetching && roomStore.isDeleting) {
    iconDelete = (
      <IconButton
        color='secondary'
        onClick={roomStore.deletingCancel}
        icon={<MdOutlineDeleteSweep />}
      />
    );
  }

  if (!roomStore.isFetching && !roomStore.isDeleting) {
    iconDelete = (
      <IconButton
        color='secondary'
        onClick={roomStore.deletingInProgress}
        icon={<MdOutlineDelete />}
      />
    );
  }

  return (
    <Block containerClassName={styles.header_container} color='primary'>
      <div className={styles.heading_container}>
        {roomStore.activeRoom && (
          <IconButton
            className={styles.hide}
            size='lg'
            color='secondary'
            onClick={roomStore.showOrHideRoomSidebar}
            icon={<MdKeyboardArrowLeft />}
          />
        )}
        <h5 className={styles.header}>Комнаты</h5>
      </div>
      <div className={styles.btns}>
        {iconPlusMinus}
        {iconDelete}
      </div>
    </Block>
  );
}

export default observer(MyRoomsHeader);
