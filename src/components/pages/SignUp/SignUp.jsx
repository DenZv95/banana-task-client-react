import React from 'react';
import Button from '../../ui/Button/Button';
import Field from '../../ui/Field/Field';
import styles from './SignUp.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  let navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles['container-form']}>
          <span className={styles['login-form-title']}>Sign Up</span>
          <form className={styles.form}>
            <Field placeholder='Email' type='email' required />

            <Field placeholder='Password' type='password' required />

            <Field placeholder='Password' type='password' required />

            <Button
              text='Sign up'
              callback={() => {
                navigate('/');
              }}
            />

            <div className={styles['sign-up-form-container']}>
              <span className='text1'>Are you already registered? </span>

              <Link className='text3' to='/login'>
                Sign in now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
