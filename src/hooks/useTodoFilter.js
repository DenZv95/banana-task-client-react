import { useState } from 'react';

export const useTodoFilter = (items) => {
  const [filterTodo, setFilterTodo] = useState('all');

  let filteredItems;
  switch (filterTodo) {
    case 'all':
      filteredItems = items;
      break;
    case 'active':
      filteredItems = items.filter((item) => !item.done);
      break;
    case 'done':
      filteredItems = items.filter((item) => item.done);
      break;
    default:
      filteredItems = items;
      break;
  }

  return { filteredItems, filterTodo, setFilterTodo };
};
