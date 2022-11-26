import styles from './CheckBox.module.scss';
import { ReactComponent as CheckImage } from '../../../images/check.svg';
import { useMutation, useQueryClient } from 'react-query';
import { $api } from '../../../api/Api';
import Button from '../Button/Button';

const CheckBox = ({ todoId, checked = false }) => {
  const queryClient = useQueryClient();
  const classButton = checked ? styles.done : styles.unDone;
  const { mutate: update, reset } = useMutation(
    'Done',
    () =>
      $api({
        url: '/tasks/update',
        type: 'PUT',
        body: {
          taskId: todoId,
          complete: !checked,
        },
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries('get tasks');
      },
    }
  );

  return (
    <Button
      onClick={() => {
        update();
        reset();
      }}
      className={`${styles.buttonSvg} ${classButton}`}
    >
      <CheckImage />
    </Button>
  );
};

export default CheckBox;
