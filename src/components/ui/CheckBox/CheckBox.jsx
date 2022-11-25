import styles from './CheckBox.module.scss';
import { ReactComponent as CheckImage } from '../../../images/check.svg';
import { useMutation, useQueryClient } from 'react-query';
import { $api } from '../../../api/Api';

const CheckBox = ({ todoId, checked = false }) => {
  const queryClient = useQueryClient();

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
    <button
      className={`${styles.buttonSvg} ${checked ? styles.done : styles.unDone}`}
      onClick={() => {
        update();
        reset();
      }}
    >
      <CheckImage />
    </button>
  );
};

export default CheckBox;
