import styles from './ModalEdit.module.scss';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi';

const ModalEdit = ({ isOpen, setIsOpen, todoItem }) => {
  const [text, setText] = useState('');
  const { updateTodo } = useApi();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setText(todoItem.name);
    setCompleted(todoItem.complete ? true : false);
  }, [isOpen, todoItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo.mutate({ _id: todoItem._id, name: text, complete: completed });
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
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Email'
          type='text'
          className={styles.input}
          value={text}
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
          <option value={false}>Incomplete</option>
          <option value={true}>Complete</option>
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
