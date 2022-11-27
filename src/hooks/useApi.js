import { useMutation, useQueryClient } from 'react-query';
import { $api } from '../api/Api';

export const useApi = () => {
  const queryClient = useQueryClient();

  const invalidateGetTodo = () => {
    queryClient.invalidateQueries('get tasks');
  };

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
        invalidateGetTodo();
      },
    }
  );

  const updateTodo = useMutation(
    'updateTodo',
    (todo) =>
      $api({
        url: '/tasks/update',
        type: 'PUT',
        body: {
          taskId: todo._id,
          name: todo.name,
          complete: todo.complete,
        },
      }),
    {
      onSuccess(data) {
        invalidateGetTodo();
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
        invalidateGetTodo();
      },
    }
  );

  const completeTodo = useMutation(
    'completeTodo',
    (todoBody) =>
      $api({
        url: '/tasks/update',
        type: 'PUT',
        body: todoBody,
      }),
    {
      onSuccess(data) {
        invalidateGetTodo();
      },
    }
  );

  return { removeTodo, createTodo, updateTodo, completeTodo };
};
