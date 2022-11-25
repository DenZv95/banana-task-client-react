import React, { useState } from 'react';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { $api } from '../../../api/Api';
import { useAuth } from '../../../hooks/useAuth';

import { ReactComponent as CheckImage } from '../../../images/check.svg';
import { ReactComponent as TrashImage } from '../../../images/trash.svg';
import { ReactComponent as EditImage } from '../../../images/edit-2.svg';

import FilterButtonPanel from '../../ui/FilterButtonPanel/FilterButtonPanel';
import Settings from '../../ui/Settings/Settings';

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [textTodo, setTextTodo] = useState('');

  let navigate = useNavigate();
  const queryClient = useQueryClient();
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
        setTodoList(data);
      },
    }
  );

  const { mutate: create } = useMutation(
    'Create',
    () =>
      $api({
        url: '/tasks/create',
        auth: false,
        type: 'POST',
        body: { name: textTodo },
      }),
    {
      onSuccess(data) {
        console.log(data);
        queryClient.invalidateQueries('get tasks');
        setTextTodo('');
      },
    }
  );

  return (
    <div className={styles.limiter}>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input placeholder='Search' className={styles.input} />
          <FilterButtonPanel />
          <Settings />
        </div>

        <ul className={styles.ToDoList}>
          {todoList.map((todo, id) => {
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
          <input
            type='text'
            placeholder='Todo'
            className={styles.input}
            value={textTodo}
            onChange={(e) => {
              setTextTodo(e.target.value);
            }}
          />
          <button
            className={styles.button}
            onClick={() => {
              create();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
