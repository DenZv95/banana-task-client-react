import styles from './ModalSettings.module.scss';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { useAuth } from '../../../hooks/useAuth';

const ModalSettings = ({ isOpen, setIsOpen }) => {
  const { setIsAuth } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };
  return (
    <Modal
      title='Edit Todo'
      isOpen={isOpen}
      onCancel={() => {
        setIsOpen(false);
      }}
      titleSubmit='Edit'
    >
      <form>
        <input type='text' className={styles.input} />
        <input type='text' className={styles.input} />
        <input type='text' className={styles.input} />
        <button onClick={handleLogout}>Logout</button>
      </form>
    </Modal>
  );
};

ModalSettings.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ModalSettings;
