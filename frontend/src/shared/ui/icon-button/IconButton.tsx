import { ReactNode } from 'react';
import styles from './IconButton.module.css';

interface Props {
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  color: 'primary' | 'secondary' | 'error';
  icon?: ReactNode;
  className?: string;
}

function IconButton({ size = 'md', icon, onClick, color = 'primary', className }: Props) {
  const classes = `${styles['icon-container']} ${styles[size]} ${styles[color]} ${className}`;

  return (
    <button type='button' className={classes} onClick={onClick}>
      {icon}
    </button>
  );
}

export default IconButton;
