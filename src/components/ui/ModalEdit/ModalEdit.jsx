import styles from './ModalEdit.module.scss';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

const ModalEdit = ({ isOpen, setIsOpen }) => {
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
        <input placeholder='Email' type='text' className={styles.input} />
        <select name='status' id='status' className={styles.status}>
          <option value='incomplete'>Incomplete</option>
          <option value='complete'>Complete</option>
        </select>
      </form>
    </Modal>
  );
};

ModalEdit.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ModalEdit;
