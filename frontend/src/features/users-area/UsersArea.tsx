import { IUser, RoomSkeleton, roomStore, User, userStore } from '@entities';
// import { Loader } from '@shared/ui';
import { userService } from '@shared/api/services';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import styles from './UsersArea.module.css';

function UsersArea() {
  useEffect(() => {
    async function fetcher() {
      userStore.fetchingUsers();
      const { users } = await userService.getUsers<IUser>();
      userStore.usersFetchedSuccessfuly(users);
    }

    fetcher();
  }, []);

  return (
    <div className={styles.rooms_container}>
      {userStore.isUsersFetching || roomStore.isAddingUsers ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : (
        <>
          {userStore.users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}

export default observer(UsersArea);
