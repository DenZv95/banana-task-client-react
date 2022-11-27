import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { $api } from '@/api/Api';

import CheckBox from '@/components/features/todo/CheckBox/CheckBox';
import FilterButtonPanel from '@/components/features/todo/FilterButtonPanel/FilterButtonPanel';
import ModalEdit from '@/components/form/ModalEdit/ModalEdit';
import ModalSettings from '@/components/form/ModalSettings/ModalSettings';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';

import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';

import { ReactComponent as EditImage } from '@/images/edit-2.svg';
import { ReactComponent as SettingsImage } from '@/images/settings.svg';
import { ReactComponent as TrashImage } from '@/images/trash.svg';

import styles from './Home.module.scss';

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [textTodo, setTextTodo] = useState('');
  const [todoItemEdit, setTodoItemEdit] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  let navigate = useNavigate();

  const { isAuth } = useAuth();
  const { removeTodo, createTodo } = useApi();

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
          <Input placeholder='Search' className={styles.input} />

          <FilterButtonPanel filter={filter} setFilter={setFilter} />

          <Button
            onClick={() => {
              setIsOpenSettings(true);
            }}
          >
            <SettingsImage />
          </Button>
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
                  <Button
                    className={styles.buttonSvg}
                    onClick={() => {
                      removeTodo.mutate(todo._id);
                    }}
                  >
                    <TrashImage />
                  </Button>
                  <Button
                    className={styles.buttonSvg}
                    onClick={() => {
                      setTodoItemEdit(todo);
                      setIsOpenEdit(true);
                    }}
                  >
                    {' '}
                    <EditImage />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>

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
      </div>
      <ModalEdit
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        todoItem={todoItemEdit}
      />
      <ModalSettings isOpen={isOpenSettings} setIsOpen={setIsOpenSettings} />
    </div>
  );
};

export default Home;
