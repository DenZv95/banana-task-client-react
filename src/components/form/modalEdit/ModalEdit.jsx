import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Input from '@/components/ui/input/Input';
import Modal from '@/components/ui/modal/Modal';

import { useApi } from '@/hooks/useApi';

import styles from './ModalEdit.module.scss';

const ModalEdit = ({ isOpen, setIsOpen, todoItem }) => {
  const [text, setText] = useState('');
  const { updateTodo } = useApi();
  const [completed, setCompleted] = useState('notDone');

  useEffect(() => {
    setText(todoItem.name);
    setCompleted(todoItem.done ? 'Done' : 'notDone');
  }, [isOpen, todoItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo.mutate({
      id: todoItem.id,
      name: text,
      done: completed === 'Done' ? 1 : 0,
    });
    setIsOpen(false);
  };

  return (
    <Modal
      title='Edit Todo'
      isOpen={isOpen}
      onCancel={() => {
        setIsOpen(false);
      }}
      onSubmit={handleSubmit}
      titleSubmit='Edit'
    >
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <Input
          placeholder='Email'
          type='text'
          value={text || ''}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <select
          name='completed'
          id='completed'
          className={styles.status}
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
        >
          <option value={'notDone'}>Incomplete</option>
          <option value={'Done'}>Complete</option>
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
