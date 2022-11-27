import React, { useState } from 'react';

import Button from '@/components/ui/button/Button';

import { useApi } from '@/hooks/useApi';

import { ReactComponent as EditImage } from '@/images/edit-2.svg';
import { ReactComponent as TrashImage } from '@/images/trash.svg';

import CheckBox from '../checkBox/CheckBox';

import styles from './ItemTodo.module.scss';

const ItemTodo = ({ item, setTodoItemEdit, setIsOpenEdit }) => {
  const { removeTodo } = useApi();

  return (
    <>
      <li className={styles.ToDoItem}>
        <div className={styles.todoDetails}>
          <CheckBox todoId={item._id} checked={item.complete} />
          <div className={styles.todoTexts}>
            <span>{item.name}</span>
            <span>{item.createdAt}</span>
          </div>
        </div>

        <div className={styles.todoActions}>
          <Button
            className={styles.buttonSvg}
            onClick={() => {
              removeTodo.mutate(item._id);
            }}
          >
            <TrashImage />
          </Button>
          <Button
            className={styles.buttonSvg}
            onClick={() => {
              setTodoItemEdit(item);
              setIsOpenEdit(true);
            }}
          >
            <EditImage />
          </Button>
        </div>
      </li>
    </>
  );
};

export default ItemTodo;
