import { useMutation, useQueryClient } from 'react-query';
import { $api } from '../api/Api';

export const useApi = () => {
  const queryClient = useQueryClient();

  const createTodo = useMutation(
    'createTodo',
    (textTodo) =>
      $api({
        url: '/tasks/create',
        type: 'POST',
        body: { name: textTodo },
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries('get tasks');
      },
    }
  );

  const removeTodo = useMutation(
    'removeTodo',
    (todoId) =>
      $api({
        url: '/tasks/delete',
        type: 'DELETE',
        body: { taskId: todoId },
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries('get tasks');
      },
    }
  );
  return { removeTodo, createTodo };
};
