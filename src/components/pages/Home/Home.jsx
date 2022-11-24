import React, { useState } from 'react';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { $api } from '../../../api/Api';
import { useAuth } from '../../../hooks/useAuth';

import { ReactComponent as CheckImage } from '../../../images/check.svg';
import { ReactComponent as TrashImage } from '../../../images/trash.svg';
import { ReactComponent as SettingsImage } from '../../../images/settings.svg';
import { ReactComponent as EditImage } from '../../../images/edit-2.svg';
import FilterButtonPanel from '../../ui/FilterButtonPanel/FilterButtonPanel';

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
          <FilterButtonPanel />
          <button className={styles.circleButton}>
            <SettingsImage />
          </button>
        </div>

        <ul className={styles.ToDoList}>
          {todos.map((todo, id) => {
            return (
              <li key={id} className={styles.ToDoItem}>
                <div className={styles.todoDetails}>
                  <button className={styles.buttonSvg}>
                    <CheckImage />
                  </button>
                  <div className={styles.todoTexts}>
                    <span> {todo.name}</span>
                    <span>{todo.createdAt}</span>
                  </div>
                </div>
                <div className={styles.todoActions}>
                  <button className={styles.buttonSvg}>
                    <TrashImage />
                  </button>
                  <button className={styles.buttonSvg}>
                    <EditImage />
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
