import { useState, useEffect, useMemo } from 'react';
import BlueButton from '../../components/UI/BlueButton';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { generateAvatar } from '../../app/helpers';
import DatePicker from 'react-datepicker';
import cl from './css/games.module.css';
import { useSelector } from 'react-redux';

const GameForm = ({ edit, afterSubmit }) => {
  const { id: gameId } = useParams();

  const navigate = useNavigate();

  const noGame = { id: 0, name: 'Игра не выбрана', image_path: '' };
  const [players, setPlayers] = useState([]);
  const [users, setUsers] = useState([]);
  const [datePlayed, setDatePlayed] = useState(new Date());
  const [boardgame, setBoardGame] = useState(noGame);
  const [boardGames, setBoardGames] = useState([noGame]);
  const [photo, setPhoto] = useState(null);
  const [clubId, setClubId] = useState(null);
  const clubs = useSelector(state => state.general.clubs)

  useEffect(() => {
    if (edit) {
      api.get(`/games/${gameId}`).then(res => {
        setPlayers(res.data.game.players);
        setBoardGame(res.data.game.boardgame);
        setUsers(res.data.users);
        setDatePlayed(new Date(res.data.game.date_played.split('-').reverse().join('-')));
      });
    } else {
      api.get('/users').then(res => {
        setUsers(
          res.data.data.map(u => {
            u.winner = false;
            u.points = '';
            return u;
          })
        );
      });
    }

    api.get('/boardgames').then(res => setBoardGames([noGame, ...res.data.data]));
  }, []);

  const sortedUsers = useMemo(() => {
    const sorted = [...users];
    sorted.sort((a, b) => {
      if (a.nickname > b.nickname) return 1;
      if (a.nickname < b.nickname) return -1;
      return 0;
    });
    return sorted;
  }, [users]);

  function chooseBoardgame(e) {
    setBoardGame(boardGames.find(b => b.id === Number(e.target.value)));
  }

  function chooseUser(user) {
    setPlayers([...players, user]);
    setUsers(users.filter(u => u.id !== user.id));
  }

  function unChoosePlayer(player) {
    setUsers([...users, player]);
    setPlayers(players.filter(p => p.id !== player.id));
  }

  function winnerToggle(id) {
    setPlayers(
      players.map(player => {
        if (player.id === id) {
          player.winner = !player.winner;
        }
        return player;
      })
    );
  }

  function changePoints(playedId, value) {
    setPlayers(
      players.map(player => {
        if (player.id === playedId) {
          player.points = value;
        }
        return player;
      })
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('boardgame_id', boardgame.id);
    formData.append('date_played', datePlayed.toString().split(' (')[0]);
    formData.append('players', JSON.stringify(players));
    formData.append('photo', photo);
    if (clubId !== null && clubId !== '') {
      formData.append('club_id', Number(clubId));
    }

    if (edit) {
      api
        .post(`games/${gameId}?_method=PUT`, formData)
        .then(() => {
          navigate('/');
        })
        .catch(err => {
          alert('Error after game edit', err);
          console.log('Error after game edit', err);
        });
    } else {
      api
        .post('games', formData)
        .then(() => {
          navigate('/');
          afterSubmit();
        })
        .catch(err => alert('Error after game Create', err));
    }
  }

  return (
    <form
      className={
        cl.gameForm +
        ' flex flex-col justify-evenly h-min w-content p-5  bg-gray-300 border-gray-300 border-solid border-2 rounded-3xl pt-5 pb-10'
      }
      onSubmit={onSubmit}
    >
      {/* ------------------CHOOSE GAME---------------------------- */}
      <div className='flex mb-2'>
        <select
          name='club_id'
          value={clubId}
          onChange={e => setClubId(e.target.value)}
          className='mb-2 '
        >
          <option value=''>Клуб</option>
          {clubs.map(club => (
            <option value={club.id} key={'boardgame' + club.name}>
              {club.name}
            </option>
          ))}
        </select>

        <select name='game' value={boardgame.id} onChange={chooseBoardgame} className='mb-2 '>
          {boardGames.map(boardgame => (
            <option value={boardgame.id} key={'boardgame' + boardgame.name + boardgame.id}>
              {boardgame.name}
            </option>
          ))}
        </select>

        <div className='w-20 ml-5'>
          <img src={boardgame.imageUrl} alt='' />
        </div>
      </div>

      <DatePicker
        selected={datePlayed}
        onChange={date => setDatePlayed(date)}
        dateFormat='dd-MM-yyyy'
        className='mb-2'
      />

      <div className='flex justify-between items-start'>
        {/* ------------------USER LIST---------------------------- */}
        <div className='w-2/5'>
          <ul className='w-full inline-block p-3 h-52 overflow-auto'>
            {sortedUsers.map(user => (
              <li
                onClick={() => chooseUser(user)}
                className='flex justify-evenly items-center  mb-1 rounded-full cursor-pointer'
                key={user.nickname}
              >
                <img
                  src={user.avatarUrl || generateAvatar(user.nickname)}
                  alt=''
                  className='w-8 h-8 rounded-full'
                />
                <p className='text-center w-3/4 pl-2'>{user.nickname}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------PLAYERS LIST---------------------------- */}
        <div className='w-3/5'>
          {players.length > 0 && (
            <ul className='p-3 flex flex-col'>
              {players.map(player => (
                <li
                  className='flex justify-between items-center w-full mb-1 cursor-pointer'
                  key={player.nickname}
                >
                  {/* ------------------player-avatar---------------------------- */}
                  <img
                    src={player.avatarUrl || generateAvatar(player.nickname)}
                    alt=''
                    className='w-10 h-10 rounded-full'
                  />

                  {/* ------------------player-nickname---------------------------- */}
                  <p className='text-center'>{player.nickname}</p>

                  {/* ------------------player-winner---------------------------- */}
                  <input
                    type='checkbox'
                    checked={player.winner}
                    onChange={() => winnerToggle(player.id)}
                  />

                  {/* ------------------player-points---------------------------- */}
                  {boardgame.has_points ? (
                    <input
                      type='text'
                      value={player.points}
                      className='w-20 h-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5'
                      onChange={e => changePoints(player.id, e.target.value)}
                      placeholder='0'
                    />
                  ) : (
                    ''
                  )}

                  {/* ------------------player-remove---------------------------- */}
                  <span onClick={() => unChoosePlayer(player)} className='text-red-500'>
                    X
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ------------------IMAGE---------------------------- */}
      <div className='mt-2'>
        <label
          htmlFor='image'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Картинка
        </label>
        <input
          type='file'
          name='image'
          id='image'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          onChange={e => setPhoto(e.target.files[0])}
        />
      </div>

      <BlueButton
        disabled={boardgame.id === 0 || players.length === 0 || !players.find(p => p.winner)}
      >
        Отправить
      </BlueButton>
    </form>
    // </section>
  );
};

export default GameForm;
