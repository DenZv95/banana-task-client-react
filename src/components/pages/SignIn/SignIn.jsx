import React from 'react';
import Button from '../../ui/Button/Button';
import Field from '../../ui/Field/Field';
import styles from './SignIn.module.scss';

const SignIn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles['container-form']}>
          <span className={styles['login-form-title']}>Sign In</span>
          <form className={styles.form}>
            <Field placeholder='Email' type='email' required />

            <Field placeholder='Password' type='password' required />

            <div className='text-right'>
              <span className='text1'>Forgot </span>
              <a className='text2' href='/'>
                Username / Password?
              </a>
            </div>

            <Button text='Sign in' />

            <div className={styles['sign-up-form-container']}>
              <span className='text1'>Don't have an account? </span>
              <a className='text3' href='/'>
                Sign up now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
