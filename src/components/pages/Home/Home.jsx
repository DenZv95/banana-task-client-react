import React, { useState } from 'react';
import styles from './Home.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { $api } from '../../../api/Api';
import { useAuth } from '../../../hooks/useAuth';

const Home = () => {
  const [todos, setTodos] = useState([]);
  let navigate = useNavigate();
  const { isAuth } = useAuth();

  if (!isAuth) {
    navigate('/login');
  }

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
