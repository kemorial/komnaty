import { roomStore, User, userStore } from '@entities';
import { NewRoomForm, RoomsArea, RoomSearch } from '@features';
import { observer } from 'mobx-react';
import styles from './MyRooms.module.css';
import MyRoomsHeader from './ui/room-area-header/MyRoomsHeader';

function MyRooms() {
  return (
    <>
      <aside
        className={styles.container + ' ' + (roomStore.isRoomSidebarHidden ? styles.hide : '')}>
        <MyRoomsHeader />
        {roomStore.isAddingNewRoom && <NewRoomForm />}
        {!roomStore.isAddingNewRoom && <RoomSearch />}
        <RoomsArea key={'123-123'} />
        {/* @ts-ignore */}
        <User disableSelecting user={userStore.user} />
      </aside>
    </>
  );
}

export default observer(MyRooms);
