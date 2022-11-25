import styles from './CheckBox.module.scss';
import { ReactComponent as CheckImage } from '../../../images/check.svg';

const CheckBox = ({ checked = false }) => {
  return (
    <button
      className={`${styles.buttonSvg} ${checked ? styles.done : styles.unDone}`}
    >
      <CheckImage />
    </button>
  );
};

export default CheckBox;
