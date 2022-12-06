import { useState } from 'react';

import { useDebounce } from './useDebounce';

export const useTodoSearch = (items) => {
  const [enteredSearchValue, setEnteredSearchValue] = useState('');
  const activeSearchValue = useDebounce(enteredSearchValue, 300);

  const availableItems = activeSearchValue
    ? items.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(activeSearchValue.toLowerCase()) > -1
        );
      })
    : items;

  return {
    availableItems,
    enteredSearchValue,
    setEnteredSearchValue,
  };
};
