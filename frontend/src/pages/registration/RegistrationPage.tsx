import { RegistrationForm } from '@features';
import { Link } from 'react-router-dom';
import styles from './RegistrationPage.module.css';

export default function RegistrationPage() {
  return (
    <main className={styles.page}>
      <div className={styles.widget}>
        <h4 className={styles.title}>
          Добро пожаловать в <span className={styles.logo}>Комнаты</span>
        </h4>
        <div className={styles.subtitle}>Введите свои данные для регистрации в приложении</div>
        <RegistrationForm className={styles.form} />
        <div className={styles.footer}>
          Уже зарегистрированы?{' '}
          <Link className='link' to={'/login'}>
            Войти в аккаунт
          </Link>
        </div>
      </div>
    </main>
  );
}
