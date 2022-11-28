import React, { useState } from 'react';

import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';

import { useApi } from '@/hooks/useApi';

import styles from './AddTodoForm.module.scss';

const AddTodoForm = () => {
  const [textTodo, setTextTodo] = useState('');
  const { createTodo } = useApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textTodo !== '') {
      createTodo.mutate(textTodo);
      setTextTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addContainer}>
      <Input
        type='text'
        placeholder='Todo text...'
        className={styles.input}
        value={textTodo}
        onChange={(e) => {
          setTextTodo(e.target.value);
        }}
      />
      <Button>Add</Button>
    </form>
  );
};

export default AddTodoForm;
