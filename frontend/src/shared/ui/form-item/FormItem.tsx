import styles from './FormItem.module.css';

interface Props {
  label?: string;
  error?: string;
  children: React.ReactNode;
  errorClassName?: string;
}

export default function FormItem({ children, label, error, errorClassName }: Props) {
  return (
    <label className={styles.item}>
      {label && (
        <div className={styles.label}>
          <div>{label}</div>
          {error && <div className={`${styles.error} ${errorClassName}`}>{error}</div>}
        </div>
      )}
      {children}
    </label>
  );
}
