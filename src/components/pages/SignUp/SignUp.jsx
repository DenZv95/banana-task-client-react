import React from 'react';
import styles from './SignUp.module.scss';

const SignUp = () => {
  return (
    <div className={styles.limiter}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles['container-form']}>
            <span className={styles['login-form-title']}>Sign In</span>
            <form className={styles.form}>
              <div className={styles['input-form-container']}>
                <input
                  className={styles.input}
                  type='text'
                  placeholder='Логин'
                />
              </div>
              <div className={styles['input-form-container']}>
                <input
                  className={styles.input}
                  type='password'
                  placeholder='Пароль'
                />
              </div>
              <div className={styles['input-form-container']}>
                <input
                  className={styles.input}
                  type='password'
                  placeholder='Пароль'
                />
              </div>

              <div className={styles['button-form-container']}>
                <button className={styles['button-form']}>Sign in</button>
              </div>
              <div className={styles['sign-up-form-container']}>
                <span className='text1'>Are you already registered? </span>
                <a className='text3' href='/'>
                  Sign in now
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
