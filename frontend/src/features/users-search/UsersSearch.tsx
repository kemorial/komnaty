import { roomStore } from '@entities';
import { IconButton, Input } from '@shared/ui';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import styles from './UsersSearch.module.css';

function UsersSearch() {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (!search) return;
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

export default observer(UsersSearch);
