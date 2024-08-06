import { IconButton } from '@shared/ui';
import dayjs from 'dayjs';
import { FaRegClock } from 'react-icons/fa';
import styles from './MessageHeader.module.css';

interface Props {
  author: string;
  created_at?: Date | number;
  isSaving?: boolean;
}

function MessageHeader({ author, created_at, isSaving = false }: Props) {
  return (
    <div className={styles.container}>
      <span>{author}</span>
      <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {isSaving ? (
          <IconButton color='secondary' size='sm' icon={<FaRegClock />} />
        ) : (
          dayjs(created_at).format('HH:mm')
        )}
      </span>
    </div>
  );
}

export default MessageHeader;
