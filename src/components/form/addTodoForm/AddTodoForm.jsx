import React, { useState } from 'react';

import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';

import { useApi } from '@/hooks/useApi';

import styles from './AddTodoForm.module.scss';

const AddTodoForm = () => {
  const [textTodo, setTextTodo] = useState('');
  const { createTodo } = useApi();
  return (
    <div className={styles.addContainer}>
      <Input
        type='text'
        placeholder='Todo text...'
        className={styles.input}
        value={textTodo}
        onChange={(e) => {
          setTextTodo(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          createTodo.mutate(textTodo);
          setTextTodo('');
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default AddTodoForm;
