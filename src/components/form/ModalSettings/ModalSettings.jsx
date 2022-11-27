import PropTypes from 'prop-types';

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import Modal from '@/components/ui/Modal/Modal';

import { useAuth } from '@/hooks/useAuth';

import styles from './ModalSettings.module.scss';

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
      <form className={styles.settingsForm}>
        <Input type='text' placeholder='email' />
        <Input type='text' placeholder='Password' />
        <Input type='text' placeholder='Password' />

        <Button onClick={handleLogout}>Logout</Button>
      </form>
    </Modal>
  );
};

ModalSettings.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ModalSettings;
