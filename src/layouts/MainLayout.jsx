import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto'>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
