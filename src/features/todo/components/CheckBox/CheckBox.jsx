import Button from '@/components/ui/Button/Button';

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
          taskId: todoId,
          complete: !checked,
        });
      }}
      className={`${styles.buttonSvg} ${classButton}`}
    >
      <CheckImage />
    </Button>
  );
};

export default CheckBox;
