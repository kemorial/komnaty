import styles from './MessageSkeleton.module.css';

function MessageSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_author + ' ' + styles.pulse + ' ' + styles.skelet} />
        <div className={styles.header_time + ' ' + styles.pulse + ' ' + styles.skelet} />
      </div>
      <div className={styles.divider + ' ' + styles.pulse} />
      <div className={styles.body}>
        <div className={styles.line + ' ' + styles.pulse + ' ' + styles.skelet} />
        <div className={styles.line + ' ' + styles.pulse + ' ' + styles.skelet} />
      </div>
    </div>
  );
}

export default MessageSkeleton;
