import { forwardRef } from 'react';
import styles from './Input.module.css';
interface Props {
  type?: 'text' | 'password' | 'submit' | 'email';
  error?: string | undefined;
  size?: 'lg' | 'md' | 'sm';
  iconAlign?: 'left' | 'right';
  placeholder?: string;
  icon?: React.ReactNode;
  ref?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  onInputChange?: (e: string) => void;
}

const Input = forwardRef(
  (
    {
      type = 'text',
      size = 'md',
      icon,
      placeholder,
      disabled,
      iconAlign = 'left',
      containerClassName,
      inputClassName,
      onInputChange,
      ...props
    }: Props,
    ref,
  ) => {
    const inputStyle = `${styles.input} ${icon && styles.padding} ${inputClassName}`;
    const inputContainerStyle = `${styles['input-container']} ${containerClassName} ${styles[size]}`;

    return (
      <div className={inputContainerStyle}>
        {iconAlign === 'left' && <div className={styles.icon}>{icon}</div>}
        <input
          className={inputStyle}
          placeholder={placeholder}
          type={type}
          // @ts-ignore
          ref={ref}
          onChange={(e) => onInputChange?.(e?.target?.value || '')}
          disabled={disabled}
          {...props}
        />
        {iconAlign === 'right' && <div className={styles.icon}>{icon}</div>}
      </div>
    );
  },
);

export default Input;
