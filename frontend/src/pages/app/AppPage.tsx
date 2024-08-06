import { socketService } from '@shared/api/services';
import { Chat, MyRooms } from '@widgets';
import { useEffect } from 'react';
import styles from './App.module.css';

function AppPage() {
  useEffect(() => {
    socketService.connect();
  }, []);

  return (
    <div className={styles.app}>
      <MyRooms />
      <Chat />
    </div>
  );
}

export default AppPage;
