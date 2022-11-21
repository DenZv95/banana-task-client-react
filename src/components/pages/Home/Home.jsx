import React from 'react';
import Button from '../../ui/Button/Button';
import Field from '../../ui/Field/Field';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  const todos = [
    {
      id: 1,
      name: 'Task 1',
      complete: false,
    },
    {
      id: 2,
      name: 'Task 2',
      complete: false,
    },
    {
      id: 3,
      name: 'Task 3',
      complete: false,
    },
    {
      id: 4,
      name: 'Task 4',
      complete: false,
    },
  ];
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
