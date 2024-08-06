import { roomStore } from '@entities';
import { UsersArea, UsersSearch } from '@features';
import { observer } from 'mobx-react';
import styles from './AddUsersInRoomSidebar.module.css';
import SidebarHeader from './ui/sidebar-header/SidebarHeader';

function AddUsersInRoomSidebar() {
  const className = `${styles.sidebar} ${roomStore.isUsersSidebarHidden && styles.hide}`;
  return (
    <div className={className}>
      <SidebarHeader />
      <UsersSearch />
      <UsersArea />
    </div>
  );
}

export default observer(AddUsersInRoomSidebar);
