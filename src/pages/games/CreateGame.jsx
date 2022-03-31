import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import { useState, useEffect } from 'react';
import BlueButton from '../../components/UI/BlueButton';
import api from '../../api/api';
import { BASE_URL_PATH } from '../../app/constants';
import { useNavigate } from 'react-router-dom';

const CreateGame = () => {
  const navigate = useNavigate();

  const noGame = { id: 0, name: 'Игра не выбрана', image_path: '' };
  const [userListOpen, setUserListOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [users, setUsers] = useState([]);

  const [boardgame, setBoardGame] = useState(noGame);
  const [boardGames, setBoardGames] = useState([noGame]);

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data.map((u) => {
      u.winner = false;
      return u;
    })));
    api.get('/boardgames').then((res) => setBoardGames([noGame, ...res.data]));
  }, []);

  function chooseBoardgame(e) {
    setBoardGame(boardGames.find((b) => b.id === Number(e.target.value)));
  }

  function chooseUser(user) {
    setPlayers([...players, user]);
    setUsers(users.filter((u) => u.id !== user.id));
    setUserListOpen(false);
  }

  function unChoosePlayer(player) {
    setUsers([...users, player]);
    setPlayers(players.filter((p) => p.id !== player.id));
  }

  function winnerToggle(id) {
    setPlayers(
      players.map((player) => {
        if (player.id === id) {
          player.winner = !player.winner;
        }
        return player;
      })
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('boardgame_id', boardgame.id);
    formData.append('players', JSON.stringify(players));
    
    api.post('games', formData).then(() => {
      navigate('/');
    }).catch(err => alert(err))
  }

  return (
    <section className='flex flex-col justify-center items-center content-center h-screen relative'>
      <form
        className='flex flex-col justify-evenly h-min w-1/3 p-5  bg-gray-300 border-gray-300 border-solid border-2 rounded-3xl pt-5 pb-10'
        onSubmit={onSubmit}
      >
        <div className='flex'>
          <select
            name='game'
            value={boardgame.id}
            onChange={chooseBoardgame}
            className='mb-2 w-full'
          >
            {boardGames.map((boardgame) => (
              <option value={boardgame.id} key={'boardgame' + boardgame.name}>
                {boardgame.name}
              </option>
            ))}
          </select>
          <div className='w-10 h-10 ml-5'>
            <img
              src={`${BASE_URL_PATH}/${boardgame.image_path}`}
              alt=''
            />
          </div>
        </div>
        <div className='flex justify-evenly items-center'>
          {/* ------------------NICKNAME---------------------------- */}
          <div className='w-1/4'>
            <p
              onClick={() => setUserListOpen(!userListOpen)}
              className='p-2 mb-2 rounded-full bg-amber-50 cursor-pointer text-center'
            >
              Добавить игрока
            </p>
            {userListOpen && (
              <ul>
                {users.map((user) => (
                  <li
                    onClick={() => chooseUser(user)}
                    className='flex justify-evenly items-center bg-white mb-1 rounded-full cursor-pointer'
                    key={user.nickname}
                  >
                    <img
                      src={user.avatar_path}
                      alt=''
                      className='w-10 h-10 rounded-full'
                    />
                    <p className='text-center w-3/4'>{user.nickname}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='w-3/4'>
            {players.length > 0 && (
              <ul>
                {players.map((player) => (
                  <li
                    className='flex justify-around items-center  mb-1 cursor-pointer'
                    key={player.nickname}
                  >
                    <img
                      src={player.avatar_path}
                      alt=''
                      className='w-10 h-10 rounded-full'
                    />
                    <p className='text-center'>{player.nickname}</p>
                    <input
                      type='checkbox'
                      checked={player.winner}
                      onChange={() => winnerToggle(player.id)}
                    />
                    <span
                      onClick={() => unChoosePlayer(player)}
                      className='text-red-500'
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <BlueButton
          text='Отправить'
          disabled={
            boardgame.id === 0 ||
            players.length === 0 ||
            !players.find((p) => p.winner)
          }
        />
      </form>
    </section>
  );
};

export default CreateGame;
