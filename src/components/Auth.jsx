import { useSelector } from 'react-redux';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Auth = ({ allowedAbilities }) => {
  const auth = useSelector((state) => state.auth);

  const location = useLocation();

  return auth.authToken?.abilities?.find((ability) =>
    allowedAbilities?.includes(ability)
  ) ? (
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
