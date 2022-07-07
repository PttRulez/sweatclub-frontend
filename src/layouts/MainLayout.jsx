import Navbar from '../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import SkeletonLoader from '../components/UI/SkeletonLoader';

const MainLayout = ({ children }) => {
  const loading = useSelector(state => state.general.loading);

  return (
    <>
      <Navbar />
      <main className='md:container mx-auto px-5'>{children}</main>
    </>
  );
};

export default MainLayout;
