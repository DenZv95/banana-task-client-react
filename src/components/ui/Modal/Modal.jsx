import PropTypes from 'prop-types';

import Button from '../Button/Button';

import styles from './Modal.module.scss';

const Modal = ({
  isOpen,
  title,
  titleCancel,
  titleSubmit,
  onCancel,
  onSubmit,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalWindow}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{title}</div>
              <Button onClick={onCancel}>X</Button>
            </div>

            <div className={styles.modalBody}>{children}</div>

            <div className={styles.modalFooter}>
              <Button onClick={onCancel}>{titleCancel}</Button>
              <Button onClick={onSubmit}>{titleSubmit}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  titleCancel: PropTypes.string,
  titleSubmit: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  isOpen: false,
  title: 'Modal title',
  titleCancel: 'Cancel',
  titleSubmit: 'Submit',
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};

export default Modal;
