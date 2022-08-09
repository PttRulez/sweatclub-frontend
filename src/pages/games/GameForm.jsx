import { useState, useEffect, useMemo } from 'react';
import BlueButton from '../../components/UI/BlueButton';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { generateAvatar } from '../../app/helpers';
import DatePicker from 'react-datepicker';
import cl from './css/games.module.css';
import { useSelector } from 'react-redux';

const GameForm = ({ edit, afterSubmit, gameId }) => {
  const navigate = useNavigate();
  const noGame = { id: 0, name: 'Игра не выбрана', image_path: '' };
  const [players, setPlayers] = useState([]);
  const [users, setUsers] = useState([]);
  const [datePlayed, setDatePlayed] = useState(new Date());
  const [boardgame, setBoardGame] = useState(noGame);
  const [boardGames, setBoardGames] = useState([noGame]);
  const [photo, setPhoto] = useState(null);
  const [clubId, setClubId] = useState('');
  const clubs = useSelector(state => state.general.clubs);
  const club = useSelector(state => state.general.club);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setClubId(club ? club.id : '');
  }, [club]);

  useEffect(() => {
    if (edit) {
      api.get(`/games/${gameId}`).then(res => {
        setPlayers(res.data.game.players);
        setBoardGame(res.data.game.boardgame);
        setClubId(res.data.game.club_id);
        setUsers(
          res.data.users.map(u => {
            u.winner = false;
            u.points = null;
            return u;
          })
        );
        setDatePlayed(new Date(res.data.game.date_played.split('-').reverse().join('-')));
      });
    } else {
      api.get('/users').then(res => {
        setUsers(
          res.data.data.map(u => {
            u.winner = false;
            u.points = null;
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
          afterSubmit();
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
        .catch(err => {
          if (err.response.status === 422) {
            setErrors(Object.values(err.response.data.errors));
          }
        });
    }
  }

  return (
    <form
      className='flex flex-col justify-evenly items-center h-min max-w-max p-2 sm:p-5  bg-gray-300 border-gray-300 border-solid border-2 rounded-3xl'
      onSubmit={onSubmit}
    >
      {/* ------------------club_id, game section---------------------------- */}
      <section className='grid grid-rows sm:grid-cols-[2fr_2fr_1fr] gap-y-2 justify-items-center sm:gap-x-2 mb-2 w-full'>
        <select
          name='club_id'
          value={clubId}
          onChange={e => setClubId(e.target.value)}
          className='w-full rounded-lg border-none'
        >
          <option value=''>Клуб</option>
          {clubs.map(club => (
            <option value={club.id} key={'boardgame' + club.name}>
              {club.name}
            </option>
          ))}
        </select>

        <select
          name='game'
          value={boardgame.id}
          onChange={chooseBoardgame}
          auto-cols-max
          className='w-full rounded-lg border-none'
        >
          {boardGames.map(boardgame => (
            <option value={boardgame.id} key={'boardgame' + boardgame.name + boardgame.id}>
              {boardgame.name}
            </option>
          ))}
        </select>

        <div className='w-20'>
          <img src={boardgame.thumbnail} alt='' />
        </div>
      </section>

      <DatePicker
        selected={datePlayed}
        onChange={date => setDatePlayed(date)}
        dateFormat='dd-MM-yyyy'
        className='mb-2 rounded-lg border-none'
      />

      {/* ------------------user list + player list SECTION ---------------------------- */}
      <section className='flex justify-between items-start w-full gap-x-2'>
        {/* ------------------USER LIST---------------------------- */}
        <div className='w-2/5 h-52 '>
          <ul className='w-full max-h-min inline-block sm:p-3 overflow-x-hidden overflow-y-auto h-52'>
            {sortedUsers.map(user => (
              <li
                onClick={() => chooseUser(user)}
                className='flex flex-wrap justify-start items-center gap-x-1 sm:gap-x-4 mb-2 rounded-full cursor-pointer'
                key={user.nickname}
              >
                <img
                  src={user.avatarUrl || generateAvatar(user.nickname)}
                  alt=''
                  className='w-8 h-8 rounded-full'
                />
                <p className='text-center'>{user.nickname}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------PLAYERS LIST---------------------------- */}
        <div className='w-3/5'>
          {players.length > 0 && (
            <ul className='flex flex-col h-52  overflow-x-hidden overflow-y-auto'>
              {players.map(player => (
                <li
                  className='flex gap-2 flex-wrap justify-between items-center w-full pb-2 mb-2 border-b-2 cursor-pointer pr-2'
                  key={player.nickname}
                >
                  <div className='flex gap-x-4 items-center'>
                    {/* ------------------player-avatar---------------------------- */}
                    <img
                      src={player.avatarUrl || generateAvatar(player.nickname)}
                      alt=''
                      className='w-8 h-8 rounded-full'
                    />

                    {/* ------------------player-nickname---------------------------- */}
                    <p className='text-center'>{player.nickname}</p>
                  </div>

                  <div className='flex gap-x-4 items-center'>
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
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

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
        disabled={
          boardgame.id === 0 ||
          players.length === 0 ||
          !players.find(p => p.winner) ||
          clubId === ''
        }
      >
        Отправить
      </BlueButton>
      {errors.length > 0 &&
        errors.map(error => <p className='text-red-500 text-center mt-2'>{error[0]}</p>)}
    </form>
    // </section>
  );
};

export default GameForm;
