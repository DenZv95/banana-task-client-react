import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { $api } from '@/api/Api';

import FilterButtonPanel from '@/components/features/todo/filterButtonPanel/FilterButtonPanel';
import ItemTodo from '@/components/features/todo/itemTodo/ItemTodo';
import AddTodoForm from '@/components/form/addTodoForm/AddTodoForm';
import ModalEdit from '@/components/form/modalEdit/ModalEdit';
import ModalSettings from '@/components/form/modalSettings/ModalSettings';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';

import { useAuth } from '@/hooks/useAuth';

import { ReactComponent as SettingsImage } from '@/images/settings.svg';

import styles from './Home.module.scss';

const Home = () => {
  const [todoList, setTodoList] = useState([]);

  const [todoItemEdit, setTodoItemEdit] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

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

  const [filterSearch, setFilterSearch] = useState('');

  const itemSearch = (todos, filter) => {
    console.log(todos.name);
    if (filter.length < 1) {
      return todos;
    }

    return todos.filter((todo) => {
      return todo.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  };

  const data = itemSearch(itemFilter(todoList, filter), filterSearch);
  return (
    <div className={styles.limiter}>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <Input
            placeholder='Search'
            className={styles.input}
            value={filterSearch}
            onChange={(e) => {
              setFilterSearch(e.target.value);
            }}
          />
          <div className={styles.buttonGroup}>
            <FilterButtonPanel filter={filter} setFilter={setFilter} />
            <div className={styles.settingsButton}>
              <Button
                onClick={() => {
                  setIsOpenSettings(true);
                }}
              >
                <SettingsImage />
              </Button>
            </div>
          </div>
        </div>

        <ul className={styles.ToDoList}>
          {data.map((todo) => {
            return (
              <ItemTodo
                key={todo._id}
                item={todo}
                setIsOpenEdit={setIsOpenEdit}
                setTodoItemEdit={setTodoItemEdit}
              />
            );
          })}
        </ul>

        <AddTodoForm />
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
