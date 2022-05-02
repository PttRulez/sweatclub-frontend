import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './login.module.css';
import {login} from './../../store/auth/actions';


const Login = () => {
  const nicknameRef = useRef();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    error_list: {},
  });

  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  function handleInput(e) {
    e.persist();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error_list: { ...formData.error_list, [e.target.name]: '', message: '' },
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    dispatch(login(formData)).catch(err => {
      if (err?.response?.status === 422) {
        setFormData({ ...formData, error_list: err.response.data.errors });
      } else {
        setFormData({
          ...formData,
          error_list: { message: err.response.data.message },
        });
      }
    });
  }

  return (
    <section className={styles.formsection}>
      <form className='flex h-min w-min p-5 flex-col text-center bg-gray-300 border-gray-300 border-solid border-2 rounded-3xl pt-5 pb-10' onSubmit={onSubmit}>
        <h1 className='mb-2 font-bold text-xl'>Логин</h1>
        <div>
          <label htmlFor='nickname' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Никнейм
          </label>
          <input
            ref={nicknameRef}
            type='text'
            autoComplete='off'
            name='nickname'
            id='nickname'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5'
            placeholder='Nickname'
            value={formData.nickname}
            onChange={handleInput}
            required
          />
          <p className='text-red-600'>{formData.error_list.nickname}</p>
        </div>
        <div className='mt-2'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Пароль
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5'
            placeholder='password'
            value={formData.password}
            onChange={handleInput}
          />
          <p className='text-red-600'>{formData.error_list.password}</p>
        </div>
        <p className='text-red-600'>{formData.error_list.message}</p>
        <div className='mt-2 text-center'>
          <button
            type='submit'
            className='mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            Войти
          </button>

          <Link to='/register' className=' text-blue-500 font-bold ml-5 text-sm'>
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
