import Loader from '../loader/Loader';
import styles from './Button.module.css';
interface Props {
  type?: 'submit' | 'button';
  size?: 'lg' | 'md' | 'sm';
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({ type = 'button', size = 'md', label, isLoading, disabled }: Props) => {
  const className = `${styles.button} ${styles[size]}`;

  return (
    <button disabled={isLoading || disabled} className={className} type={type}>
      {isLoading ? <Loader width='20' height='20' color='var(--primary-color)' /> : label}
    </button>
  );
};

export default Button;
