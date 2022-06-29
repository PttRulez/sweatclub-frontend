import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { generateAvatar } from '../../app/helpers';
import menus from './menus';
import css from './Navbar.module.css';
import { setClubs, setCurrentClub } from '../../store/general/generalReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside } from '../../hooks/useClickOutside';

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navEl = useRef(null);
  const navbarEl = useRef(null);
  const clubs = useSelector(state => state.general.clubs);
  const club = useSelector(state => state.general.club);
  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(false);

  function logout(e) {
    api
      .post('logout')
      .then(
        res => console.log('Has been logouted'),
        err => console.log('>>ERR after click logout>>', err)
      )
      .finally(() => {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            authToken: null,
            isAuth: false,
            user: null,
          },
        });

        localStorage.removeItem('auth');
        navigate('/');
      });
  }

  function clickBurger(e) {
    navEl.current.classList.toggle(css.active);
  }

  function changeClub(clubChosen) {
    if (clubChosen === null) {
      dispatch(setCurrentClub(null));
    } else {
      const club = clubs.find(club => club.id === clubChosen.id);
      dispatch(setCurrentClub(club));
    }
    setIsComponentVisible(!isComponentVisible);
  }

  useEffect(() => {
    api.get('clubs').then(res => dispatch(setClubs(res.data.data)));
  }, []);

  return (
    <div
      ref={navbarEl}
      className='relative bg-gray-200 py-2 px-5 border-gray-200 rounded flex justify-between items-center'
    >
      <img
        src='data:image/png;base64,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'
        className='mr-3 h-6 sm:h-10 cursor-pointer'
        alt='Sweatclub logo'
        onClick={() => navigate('/')}
      />
      <nav className={css.menu} ref={navEl}>
        <ul className={css['menu-list']}>
          {menus.map(item => {
            return (
              <NavLink
                onClick={() => {
                  navEl.current.classList.toggle(css.active);
                }}
                key={item.text}
                to={item.to}
                className={({ isActive }) => {
                  const add = isActive ? ' text-blue-500 font-bold' : '';
                  return 'flex h-full items-center justify-center text-center' + add;
                }}
              >
                {item.text}
              </NavLink>
            );
          })}
        </ul>
      </nav>
      <div className='flex items-center relative'>
        <div className='relative mr-5' ref={ref}>
          {club ? (
            <img
              src={club.avatarUrl}
              alt=''
              className='w-10 h-10 rounded-full cursor-pointer'
              onClick={() => setIsComponentVisible(!isComponentVisible)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faGlobe}
              className='w-8 h-8 cursor-pointer'
              onClick={() => setIsComponentVisible(!isComponentVisible)}
            />
          )}
          {isComponentVisible && (
            <div className='absolute mt-3 bg-zinc-300 p-2 rounded right-0'>
              <div
                onClick={() => changeClub(null)}
                className='flex items-center cursor-pointer hover:text-amber-600 ransition ease-in-out duration-300'
              >
                <FontAwesomeIcon icon={faGlobe} className='w-4 h-4' />
                <p className='pl-2'>Worldwide</p>
              </div>
              {clubs.map(club => (
                <div
                  onClick={() => changeClub(club)}
                  key={club.name + club.id}
                  className='mt-3 flex items-center cursor-pointer hover:text-amber-600 ransition ease-in-out duration-300'
                >
                  <img
                    src={club.avatarUrl}
                    alt=''
                    className='w-5 h-5 rounded-full bg-transparent'
                  />
                  <p className='pl-2'>{club.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className='w-content flex flex-col items-center'
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <Link to={`/profile/${user.id}`} className='flex items-center gap-x-1'>
            <img
              className='w-10 h-10 rounded-full'
              src={user.avatarUrl || generateAvatar(user.nickname)}
              alt='User Avatar'
            />
            <p className='text-gray-900 leading-none text-sm'>{user.nickname}</p>
          </Link>
          {showProfileMenu && (
            <ul className='h-10 absolute -bottom-10 mt-3 text-sm text-blue-500 bg-zinc-300 opacity-80 p-2 rounded'>
              <button onClick={logout}>logout</button>
            </ul>
          )}
        </div>
      </div>
      <div className={css.header__burger} onClick={clickBurger}>
        <span></span>
      </div>
    </div>
  );
};

export default Navbar;
