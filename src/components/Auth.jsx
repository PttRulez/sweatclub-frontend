import { useSelector } from 'react-redux';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ABILITIES } from '../utils/constants';
import api from '../api/api';

const Auth = ({ allowedAbilities }) => {
  const auth = useSelector(state => state.auth);

  const location = useLocation();

  api.get('check-auth').then(res => console.log('Auth', res.data));
  
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
