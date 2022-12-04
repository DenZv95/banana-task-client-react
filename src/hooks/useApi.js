import { useMutation, useQueryClient } from 'react-query';

import { $api } from '@/api/Api';

export const useApi = () => {
  const queryClient = useQueryClient();

  const invalidateGetTodo = () => {
    queryClient.invalidateQueries('get tasks');
  };

  const createTodo = useMutation(
    'createTodo',
    (textTodo) =>
      $api({
        url: '/tasks',
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
        url: `/tasks/${todo.id}`,
        type: 'PUT',
        body: {
          name: todo.name,
          done: todo.done,
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
        url: `/tasks/${todoId}`,
        type: 'DELETE',
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
        url: `/tasks/${todoBody.id}`,
        type: 'PUT',
        body: { done: todoBody.done },
      }),
    {
      onSuccess(data) {
        invalidateGetTodo();
      },
    }
  );

  return { removeTodo, createTodo, updateTodo, completeTodo };
};
