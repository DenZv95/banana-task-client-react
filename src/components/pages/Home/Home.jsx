import React, { useState } from 'react';
import Button from '../../ui/Button/Button';
import Field from '../../ui/Field/Field';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { $api } from '../../../api/Api';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useQuery(
    'get tasks',
    () =>
      $api({
        url: `/tasks/list`,
      }),
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setTodos(data);
      },
    }
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to='/login'>logout</Link>
        </div>
        <form className={styles.ToDoInput}>
          <input type='text' placeholder='todo...' className={styles.input} />
          <input type='submit' value='Add' />
        </form>
        <ul className={styles.ToDoList}>
          {todos.map((todo) => {
            return (
              <li key={todo.id} className={styles.ToDoItem}>
                {todo.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
