import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();

  const nicknameRef = useRef();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [errorList, setErrorList] = useState({});

  useEffect(() => {
    nicknameRef.current.focus();
    if (localStorage.getItem('authToken')?.token) {
      navigate('/');
    }
  }, []);

  function register(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    formData.append('avatar', avatar);
    
    api.post('register', formData)
    .then((res) => {
      if (res.data.status === 200) {
        const authObj = {
          authToken: res.data.authToken,
          isAuth: true,
          user: res.data.user
        }
        
        dispatch({ type: 'SET_AUTH', payload: authObj })
        localStorage.setItem('auth', JSON.stringify(authObj));

        navigate('/');
      } else if (res.data.status === 422) {
        setErrorList(res.data.errors);
      } else {
        setErrorList({message: res.data.message});
      }
    })
  }

  return (
    <section className='flex justify-center items-center content-center h-screen'>
      <form 
        className='flex h-fit w-fit p-5 flex-col text-center bg-gray-300 border-gray-300 border-solid border-2 rounded-3xl pt-5 pb-10' 
        onSubmit={register}
      >
        {/* ------------------NICKNAME---------------------------- */}
        <h1 className='mb-2 font-bold text-xl'>Регистрация</h1>
        <div>
          <label htmlFor='nickname' className='block mt-5 mb-2'>
            Никнейм
          </label>
          <input
            ref={nicknameRef}
            type='text'
            name='nickname'
            id='nickname'
            autoComplete='off'
            className='bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  p-2.5 '
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <p className='text-red-600'>{errorList.nickname}</p>
        </div>

        {/* ------------------PASSWORD---------------------------- */}
        <div>
          <label htmlFor='password' className='block mt-5 mb-2'>
            Пароль
          </label>
          <input
            type='password'
            name='password'
            id='password'
            autoComplete='off'
            className='bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  p-2.5 '
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className='text-red-600'>{errorList.password}</p>
        </div>
        <p className='text-red-600'>{errorList.password}</p>

        {/* ------------------CONFIRM PASSWORD---------------------------- */}
        <div>
          <label htmlFor='nickname' className='block mt-5 mb-2'>
            Подтвердите пароль
          </label>
          <input
            type='password'
            name='password_confirmation'
            id='password_confirmation'
            autoComplete='off'
            className='bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  p-2.5 '
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>

        {/* ------------------AVATAR---------------------------- */}
        <div className='mt-2'>
          <label htmlFor='avatar' className='block mt-5 mb-2'>
            Аватарка
          </label>
          <input
            type='file'
            name='avatar'
            id='avatar'
            className='bg-gray-50 border w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 '
            placeholder='img'
            onChange={(e) => setAvatar(e.target.files?.[0])}
            required
          />
        </div>
        <p className='text-red-600'>{errorList.avatar}</p>

        <div className='mt-5'>
          <button
            type='submit'
            className='disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5'
            disabled={!nickname || !password || !passwordConfirmation}
          >
            Регистрация
          </button>

          <Link
            to='/login'
            className=' text-blue-500 font-bold ml-5 text-sm'
          >
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
