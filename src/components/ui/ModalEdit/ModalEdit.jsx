import styles from './ModalEdit.module.scss';
import PropTypes from 'prop-types';

const ModalEdit = ({ title, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalWindow}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{title}</div>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                X
              </button>
            </div>
            <div className={styles.modalBody}>
              <form>
                <input
                  placeholder='Email'
                  type='text'
                  className={styles.input}
                />
                <select name='status' id='status' className={styles.status}>
                  <option value='incomplete'>Incomplete</option>
                  <option value='complete'>Complete</option>
                </select>
              </form>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.button}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button className={styles.button}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ModalEdit.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ModalEdit;
