import { useState } from 'react';
import Button from '../../ui/Button/Button';
import Field from '../../ui/Field/Field';
import styles from './SignIn.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { $api } from '../../../api/Api';
import { useAuth } from '../../../hooks/useAuth';

const SignIn = () => {
  const [email, setEmail] = useState('test2@test.ru');
  const [password, setPassword] = useState('123456');
  const { setIsAuth } = useAuth();

  const successLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuth(true);
    setEmail('');
    setPassword('');
    navigate('/');
  };

  let navigate = useNavigate();

  const {
    mutate: auth,
    isLoading,
    error,
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
        successLogin(data.token);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    auth();
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>ОЙ...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles['container-form']}>
          <span className={styles['login-form-title']}>Sign In</span>
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

            <div className='text-right'>
              <span className='text1'>Forgot </span>
              <a className='text2' href='/'>
                Username / Password?
              </a>
            </div>

            <Button
              text='Sign in'
              callback={() => {
                //navigate('/');
              }}
            />

            <div className={styles['sign-up-form-container']}>
              <span className='text1'>Don't have an account? </span>
              <Link className='text3' to='/registration'>
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
