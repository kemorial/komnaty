import styles from './RoomSkeleton.module.css';

function RoomSkeleton() {
  return (
    <div className={styles.room}>
      <div className={styles.room_img + ' ' + styles.pulse + ' ' + styles.avatar} />
      <div className={styles.room_descr}>
        <div className={styles.room_title + ' ' + styles.pulse} />
        <div className={styles.room_lastmessage + ' ' + styles.pulse} />
      </div>
    </div>
  );
}

export default RoomSkeleton;
