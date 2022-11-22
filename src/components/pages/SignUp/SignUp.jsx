import React, { useState } from 'react';
import Button from '../../ui/Button/Button';
import Field from '../../ui/Field/Field';
import styles from './SignUp.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { $api } from '../../../api/Api';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const successLogin = (token) => {
    localStorage.setItem('token', token);
    setEmail('');
    setPassword('');
    navigate('/');
  };

  const {
    mutate: register,
    isLoading,
    error,
  } = useMutation('Registration', () => {
    $api(
      {
        url: '/users/register',
        auth: false,
        type: 'POST',
        body: { email, password },
      },
      {
        onSuccess(data) {
          console.log(data.token);
          successLogin(data.token);
        },
      }
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    register();
  };

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles['container-form']}>
          <span className={styles['login-form-title']}>Sign Up</span>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field
              placeholder='Email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Field
              placeholder='Password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              text='Sign up'
              callback={() => {
                //navigate('/');
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
