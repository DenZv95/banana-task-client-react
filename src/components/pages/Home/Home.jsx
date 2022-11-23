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
    <div className={styles.limiter}>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input placeholder='Search' className={styles.input} />
          <div className={styles.searchButtonContainer}>
            <button className={styles.button}>All</button>
            <button className={styles.button}>Active</button>
            <button className={styles.button}>Done</button>
            <button className={styles.circleButton}>X</button>
          </div>
        </div>

        <ul className={styles.ToDoList}>
          {todos.map((todo) => {
            return (
              <li key={todo.id} className={styles.ToDoItem}>
                {todo.name}
              </li>
            );
          })}
        </ul>

        <div className={styles.addContainer}>
          <input type='text' placeholder='Todo' className={styles.input} />
          <button className={styles.button}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
