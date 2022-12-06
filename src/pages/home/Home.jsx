import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';

import { $api } from '@/api/Api';

import FilterButtonPanel from '@/components/features/todo/filterButtonPanel/FilterButtonPanel';
import ItemTodo from '@/components/features/todo/itemTodo/ItemTodo';
import AddTodoForm from '@/components/form/addTodoForm/AddTodoForm';
import ModalEdit from '@/components/form/modalEdit/ModalEdit';
import ModalSettings from '@/components/form/modalSettings/ModalSettings';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';

import { useAuth } from '@/hooks/useAuth';
import { useTodoFilter } from '@/hooks/useTodoFilter';

import { ReactComponent as SettingsImage } from '@/images/settings.svg';

import styles from './Home.module.scss';

const Home = () => {
  const [todoList, setTodoList] = useState([]);

  const [todoItemEdit, setTodoItemEdit] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const { isAuth } = useAuth();

  useQuery(
    'get tasks',
    () =>
      $api({
        url: `/tasks`,
      }),
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setTodoList(data.data);
      },
    }
  );

  const { filteredItems, filterTodo, setFilterTodo } = useTodoFilter(todoList);

  const [filterSearch, setFilterSearch] = useState('');

  const itemSearch = (todos, filter) => {
    if (filter.length < 1) {
      return todos;
    }

    return todos.filter((todo) => {
      return todo.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  };

  const data = itemSearch(filteredItems, filterSearch);
  return (
    <div className={styles.limiter}>
      {!isAuth && <Navigate to='/login' replace={true} />}

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
            <FilterButtonPanel filter={filterTodo} setFilter={setFilterTodo} />
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
                key={todo.id}
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
