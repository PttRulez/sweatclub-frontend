import Navbar from '../components/Navbar/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto px-5'>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
