const Game = ({ game }) => {
  return (
    <div className='mb-4'>
      <h3>Game - '{game.boardgame}'</h3>
      <p>Winner - {game.winner_id}</p>
    </div>
  );
};

export default Game;
