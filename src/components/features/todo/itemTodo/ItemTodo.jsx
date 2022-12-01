import format from 'date-fns/format';

import Button from '@/components/ui/button/Button';

import { useApi } from '@/hooks/useApi';

import { ReactComponent as EditImage } from '@/images/edit-2.svg';
import { ReactComponent as TrashImage } from '@/images/trash.svg';

import CheckBox from '../../../form/checkBox/CheckBox';

import styles from './ItemTodo.module.scss';

const ItemTodo = ({ item, setTodoItemEdit, setIsOpenEdit }) => {
  const { removeTodo } = useApi();

  return (
    <li className={styles.ToDoItem}>
      <div className={styles.todoActions}>
        <CheckBox todoId={item._id} checked={item.complete} />
      </div>

      <div className={styles.todoDetails}>
        <p className={styles.text}>{item.name}</p>
        <p>{format(new Date(item.createdAt), 'dd MMM yyyy')}</p>
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
  );
};

export default ItemTodo;
