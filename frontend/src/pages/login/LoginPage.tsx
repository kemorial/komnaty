import { LoginForm } from '@features';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.widget}>
        <h4 className={styles.title}>
          Добро пожаловать в <span className={styles.logo}>Комнаты</span>
        </h4>
        <div className={styles.subtitle}>Введите свои данные для входа в приложение</div>
        <LoginForm className={styles.form} />
        <div className={styles.footer}>
          Нет аккаунта?{' '}
          <Link className='link' to={'/registration'}>
            Регистрация
          </Link>
        </div>
      </div>
    </main>
  );
}
