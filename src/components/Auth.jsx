import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ABILITIES } from '../utils/constants';
import api from '../api/api';
import { logout } from '../store/auth/actions';

const Auth = ({ allowedAbilities }) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    api.get('check-auth').then(res => {
      if (res.data.trim() === 'guest') {
        dispatch(logout());
      }
    });
  }, [])
  

  if (allowedAbilities.includes(ABILITIES.All)) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }

  return auth.authToken?.abilities?.find(ability => allowedAbilities?.includes(ability)) ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : auth.isAuth ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default Auth;
