import GameForm from './GameForm';

const EditGame = () => {
  return (
    <section className='flex justify-center items-center h-screen relative'>
      <GameForm edit={true} />
    </section>
  );
};

export default EditGame;
