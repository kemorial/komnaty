import styles from './Alert.module.css';

interface Props {
  title?: string;
  type?: 'error' | 'success';
  size?: 'lg' | 'md' | 'sm';
}

function Alert({ title = '', type = 'error', size = 'lg' }: Props) {
  const className = `${styles.alert} ${styles[type]} ${styles[size]}`;
  return <div className={className}>{title}</div>;
}

export default Alert;
