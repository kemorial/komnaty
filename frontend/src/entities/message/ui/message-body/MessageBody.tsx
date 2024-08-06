import styles from './MessageBody.module.css';

interface Props {
  body: string;
}

function MessageBody({ body }: Props) {
  return <div className={styles.container}>{body}</div>;
}

export default MessageBody;
