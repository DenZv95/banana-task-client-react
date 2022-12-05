import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

import { $api } from '@/api/Api';

import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import Modal from '@/components/ui/modal/Modal';

import { useAuth } from '@/hooks/useAuth';

import styles from './ModalSettings.module.scss';

const ModalSettings = ({ isOpen, setIsOpen }) => {
  const { setIsAuth } = useAuth();

  const logout = useMutation(
    'logout',
    (todoBody) =>
      $api({
        url: `/logout`,
        type: 'POST',
        body: {},
      }),
    {
      onSuccess(data) {
        console.log(data);
        localStorage.removeItem('token');
        setIsAuth(false);
      },
    }
  );

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <Modal
      title='Settings'
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
      </form>
      <Button onClick={handleLogout}>Logout</Button>
    </Modal>
  );
};

ModalSettings.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ModalSettings;
