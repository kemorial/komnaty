import { IRoom, roomStore } from '@entities';
import { roomService } from '@shared/api/services';
import { debounce } from '@shared/helpers/debounce';
import { IconButton, Input } from '@shared/ui';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import styles from './RoomSearch.module.css';

async function fetcher(search: string) {
  roomStore.roomsFetchingInProgress();
  const { rooms } = await roomService.findRooms<IRoom>(search);
  roomStore.roomsFetchingSuccess(rooms);
}

const debouncedFetchher = debounce(fetcher);

function RoomSearch() {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (!search) return;
    debouncedFetchher(search);
  }, [search]);

  return (
    <div className={styles.search}>
      <Input
        onInputChange={setSearch}
        disabled={roomStore.isFetching}
        icon={<IconButton color='primary' icon={<IoIosSearch />} />}
        placeholder={'Поиск'}
        type={'text'}
      />
    </div>
  );
}

export default observer(RoomSearch);
