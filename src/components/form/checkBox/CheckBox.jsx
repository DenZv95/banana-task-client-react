import Button from '@/components/ui/button/Button';

import { useApi } from '@/hooks/useApi';

import { ReactComponent as CheckImage } from '@/images/check.svg';

import styles from './CheckBox.module.scss';

const CheckBox = ({ todoId, checked = false }) => {
  const { completeTodo } = useApi();

  const classButton = checked ? styles.done : styles.unDone;

  return (
    <Button
      onClick={() => {
        completeTodo.mutate({
          id: todoId,
          done: !checked,
        });
      }}
      className={`${styles.checkBox} ${classButton}`}
    >
      <CheckImage />
    </Button>
  );
};

export default CheckBox;
