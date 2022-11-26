import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { $api } from '../../../api/Api';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../ui/Button/Button';
import styles from './Auth.module.scss';

const Auth = () => {
  const [email, setEmail] = useState('test@test.ru');
  const [password, setPassword] = useState('123456');

  const [type, setType] = useState('auth');

  const { setIsAuth } = useAuth();

  let navigate = useNavigate();

  const successLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuth(true);
    setEmail('');
    setPassword('');
    navigate('/');
  };

  const { mutate: auth } = useMutation(
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
        successLogin(data.token);
      },
    }
  );

  const { mutate: register } = useMutation(
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
    if (type === 'auth') {
      auth();
    } else {
      register();
    }
  };

  return (
    <div className={styles.limiter}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>
            {type === 'auth' ? 'Sign In' : 'Sign Up'}
          </h1>
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

          <Button>{type === 'auth' ? 'Sign In' : 'Sign Up'}</Button>
        </form>
        <div className={styles.fluterText}>
          <span className='text1'>Don't have an account?</span>
          <span
            className='text3'
            onClick={() => {
              if (type === 'auth') {
                setType('reg');
              } else {
                setType('auth');
              }
            }}
          >
            {type === 'auth' ? 'Sign up now' : 'Sign in now'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
