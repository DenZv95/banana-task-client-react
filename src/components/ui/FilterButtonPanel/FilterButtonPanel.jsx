import { useState } from 'react';
import styles from './FilterButtonPanel.module.scss';

const FilterButtonPanel = ({ filter, setFilter }) => {
  const buttonsList = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  const buttons = buttonsList.map((button) => {
    const isActive = filter === button.name;
    const classButton = isActive ? styles.buttonActive : styles.buttonNotActive;
    return (
      <button
        key={button.name}
        className={`${styles.button} ${classButton}`}
        onClick={() => {
          setFilter(button.name);
        }}
      >
        {button.label}
      </button>
    );
  });
  return <div className={styles.container}>{buttons}</div>;
};

export default FilterButtonPanel;
