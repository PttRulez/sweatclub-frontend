import { useSelector } from 'react-redux';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const Auth = ({ allowedAbilities }) => {
  const auth = useSelector((state) => state.auth);

  const location = useLocation();

  return auth.authToken?.abilities?.find((ability) =>
    allowedAbilities?.includes(ability)
  ) ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : auth.isAuth ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default Auth;
