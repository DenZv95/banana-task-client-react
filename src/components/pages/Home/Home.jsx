import React, { useState } from 'react';
import styles from './Home.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { $api } from '../../../api/Api';
import { useAuth } from '../../../hooks/useAuth';

import checkImage from '../../../images/check.svg';
import trashImage from '../../../images/trash.svg';
import settingsImage from '../../../images/settings.svg';
import editImage from '../../../images/edit-2.svg';

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
            <button className={styles.circleButton}>
              <img
                src={settingsImage}
                width='29'
                height='23'
                alt='settings'
                draggable={false}
              />
            </button>
          </div>
        </div>
        <ul className={styles.ToDoList}>
          {todos.map((todo, id) => {
            return (
              <li key={id} className={styles.ToDoItem}>
                <div className={styles.todoDetails}>
                  <button>
                    <img
                      src={checkImage}
                      width='29'
                      height='23'
                      alt='check'
                      draggable={false}
                    />
                  </button>
                  <div className={styles.todoTexts}>
                    <span> {todo.name}</span>
                    <span>{todo.createdAt}</span>
                  </div>
                </div>
                <div className={styles.todoActions}>
                  <button>
                    <img
                      src={trashImage}
                      width='29'
                      height='23'
                      alt='trash'
                      draggable={false}
                    />
                  </button>
                  <button>
                    <img
                      src={editImage}
                      width='29'
                      height='23'
                      alt='edit'
                      draggable={false}
                    />
                  </button>
                </div>
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
