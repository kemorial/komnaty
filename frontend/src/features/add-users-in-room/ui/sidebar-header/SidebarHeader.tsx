import { IUser, roomStore, userStore } from '@entities';
import { roomService } from '@shared/api/services';
import { Block, IconButton } from '@shared/ui';
import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import styles from './SidebarHeader.module.css';

function SidebarHeader() {
  const addUsersToRoom = async () => {
    try {
      roomStore.addingUsersInProgress();
      // @ts-ignore
      await roomService.addUsersToRoom<IUser>(roomStore.activeRoom?.id, {
        users: userStore.selectedUsers,
      });
      roomStore.addingUsersSuccess();
      userStore.clearSelected();
    } catch (error) {
      //
    }
  };

  return (
    <Block containerClassName={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>Добавить участников</div>
      </div>
      <div className={styles.btns}>
        <IconButton
          onClick={addUsersToRoom}
          color='secondary'
          size='md'
          className={styles.hide}
          icon={<MdDone />}
        />
        <IconButton
          onClick={roomStore.hideUsersSidebar}
          color='secondary'
          size='md'
          className={styles.hide}
          icon={<RxCross2 />}
        />
      </div>
    </Block>
  );
}

export default SidebarHeader;
