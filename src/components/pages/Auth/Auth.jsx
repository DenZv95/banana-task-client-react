import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { $api } from '../../../api/Api';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Auth.module.scss';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuth } = useAuth();
  let navigate = useNavigate();

  const successLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuth(true);
    setEmail('');
    setPassword('');
    navigate('/');
  };

  const {
    mutate: auth,
    isLoading: isLoadingAuth,
    error: errorAuth,
  } = useMutation(
    'Auth',
    () =>
      $api({
        url: '/users/login',
        auth: false,
        type: 'POST',
        body: { email, password },
      }),
    {
      onSuccess(data) {
        console.log(data.token);
        successLogin(data.token);
      },
    }
  );

  const {
    mutate: register,
    isLoading,
    error,
  } = useMutation(
    'Registration',
    () =>
      $api({
        url: '/users/register',
        auth: false,
        type: 'POST',
        body: { email, password },
      }),
    {
      onSuccess(data) {
        successLogin(data.token);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    auth();
  };

  return (
    <div className={styles.limiter}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>Sign In</h1>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            placeholder='Email'
            type='email'
            value={email}
            className={styles.input}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder='Password'
            type='password'
            value={password}
            className={styles.input}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className='text-right'>
            <span className='text1'>Forgot </span>
            <a href='/' className='text2'>
              Username / Password?
            </a>
          </div>
          <button className={styles.button}> Sign in</button>
        </form>
        <div className={styles.fluterText}>
          <span className='text1'>Don't have an account?</span>
          <span className='text3'>Sign up now</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
