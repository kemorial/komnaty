import { observer } from 'mobx-react';
import { IUser } from '../model/user.model';
import userStore from '../store/user-store';
import styles from './User.module.css';

function clip(str: string, len: number = 25) {
  const postfix = str.length > len ? '...' : '';
  return str.slice(0, len) + postfix;
}

interface Props {
  user: IUser;
  disableSelecting?: boolean;
}

function User({ user, disableSelecting = false }: Props) {
  const onclick = () => {
    !disableSelecting && userStore.select(user.id);
  };

  const isActive = !disableSelecting && userStore.isSelected(user.id); //room.id === roomStore.activeRoom?.id;
  const className = `${styles.user} ${isActive && styles.active}`;

  return (
    <div onClick={onclick} className={className}>
      <div className={styles.user_img}>
        <div>{user?.username?.at(0)?.toUpperCase()}</div>
      </div>
      <div className={styles.user_descr}>
        <div className={styles.username + ' ' + styles.clip}>{clip(user.username)}</div>
      </div>
    </div>
  );
}

export default observer(User);
