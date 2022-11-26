import React, { useState } from 'react';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { $api } from '../../../api/Api';
import { useAuth } from '../../../hooks/useAuth';

import { ReactComponent as TrashImage } from '../../../images/trash.svg';
import { ReactComponent as EditImage } from '../../../images/edit-2.svg';
import { ReactComponent as SettingsImage } from '../../../images/settings.svg';

import FilterButtonPanel from '../../ui/FilterButtonPanel/FilterButtonPanel';
import CheckBox from '../../ui/CheckBox/CheckBox';
import ModalEdit from '../../ui/ModalEdit/ModalEdit';
import ModalSettings from '../../ui/ModalSettings/ModalSettings';

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [textTodo, setTextTodo] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

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
        type: 'POST',
        body: { name: textTodo },
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries('get tasks');
        setTextTodo('');
      },
    }
  );

  const { mutate: remove } = useMutation(
    'remove',
    (todoId) =>
      $api({
        url: '/tasks/delete',
        type: 'DELETE',
        body: { taskId: todoId },
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries('get tasks');
      },
    }
  );

  const [filter, setFilter] = useState('all');

  const itemFilter = (todos, filter) => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((item) => !item.complete);
      case 'done':
        return todos.filter((item) => item.complete);
      default:
        return todos;
    }
  };

  return (
    <div className={styles.limiter}>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input placeholder='Search' className={styles.input} />
          <FilterButtonPanel filter={filter} setFilter={setFilter} />
          <button
            className={styles.circleButton}
            onClick={() => {
              setIsOpenSettings(true);
            }}
          >
            <SettingsImage />
          </button>
        </div>

        <ul className={styles.ToDoList}>
          {itemFilter(todoList, filter).map((todo) => {
            return (
              <li key={todo._id} className={styles.ToDoItem}>
                <div className={styles.todoDetails}>
                  <CheckBox todoId={todo._id} checked={todo.complete} />
                  <div className={styles.todoTexts}>
                    <span> {todo.name}</span>
                    <span>{todo.createdAt}</span>
                  </div>
                </div>

                <div className={styles.todoActions}>
                  <button
                    className={styles.buttonSvg}
                    onClick={() => {
                      remove(todo._id);
                    }}
                  >
                    <TrashImage />
                  </button>
                  <button
                    className={styles.buttonSvg}
                    onClick={() => {
                      setIsOpenEdit(true);
                    }}
                  >
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
      <ModalEdit isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      <ModalSettings isOpen={isOpenSettings} setIsOpen={setIsOpenSettings} />
    </div>
  );
};

export default Home;
