import React, { useState } from 'react';
import styles from './Settings.module.scss';
import { ReactComponent as SettingsImage } from '../../../images/settings.svg';
import { useAuth } from '../../../hooks/useAuth';

const Settings = () => {
  const { setIsAuth } = useAuth();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    setIsComponentVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.circleButton}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <SettingsImage />
      </button>
      <form
        className={`${styles.form} ${isComponentVisible ? styles.show : ''}`}
      >
        <input type='text' className={styles.input} />
        <input type='text' className={styles.input} />
        <input type='text' className={styles.input} />
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

export default Settings;
