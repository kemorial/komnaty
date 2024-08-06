import { TailSpin } from 'react-loader-spinner';
import styles from './Loader.module.css';

interface Props {
  height?: string;
  width?: string;
  color?: string;
}

function Loader({ height = '50', width = '50', color = 'var(--primary-color)' }: Props) {
  return (
    <div className={styles.loader}>
      <TailSpin
        visible={true}
        height={height}
        width={width}
        color={color}
        ariaLabel='oval-loading'
        wrapperStyle={{}}
      />
    </div>
  );
}

export default Loader;
