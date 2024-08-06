import { IRoom, Room, RoomSkeleton, roomStore } from '@entities';
import { roomService } from '@shared/api/services';
// import { Loader } from '@shared/ui';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import styles from './RoomsArea.module.css';

async function fetcher() {
  const { rooms } = await roomService.getMyRooms<IRoom>();
  roomStore.roomsFetchingSuccess(rooms);
}

function Rooms() {
  useEffect(() => {
    roomStore.roomsFetchingInProgress();
    fetcher();
    setInterval(fetcher, 5000);
  }, []);

  const onDelete = async (roomId: number) => {
    roomStore.deleteOpimistic(roomId);
    await roomService.deleteRoom(roomId);
  };

  return (
    <div className={styles.rooms_container}>
      {roomStore.isFetching ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : (
        <>
          {roomStore.myRooms.map((room) =>
            room.id < 0 ? (
              <RoomSkeleton />
            ) : (
              <Room
                key={room.id}
                isDeleting={roomStore.isDeleting}
                onDelete={onDelete}
                room={room}
              />
            ),
          )}
        </>
      )}
    </div>
  );
}

export default observer(Rooms);
