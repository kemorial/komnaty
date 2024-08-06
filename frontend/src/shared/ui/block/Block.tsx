import styles from './Block.module.css';

interface Props {
  size?: 'lg' | 'md' | 'sm';
  children: React.ReactNode | React.ReactNode[];
  color?: 'primary' | 'secondary';
  containerClassName?: string;
  onClick?: () => void;
}

function Block({ size = 'md', children, color = 'primary', containerClassName, onClick }: Props) {
  const className = `${containerClassName} ${styles.block} ${styles[size]} ${styles[color]}`;
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
}

export default Block;
