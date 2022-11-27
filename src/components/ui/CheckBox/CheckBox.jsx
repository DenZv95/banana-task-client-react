import styles from './CheckBox.module.scss';
import { ReactComponent as CheckImage } from '../../../images/check.svg';

import Button from '../Button/Button';
import { useApi } from '../../../hooks/useApi';

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
