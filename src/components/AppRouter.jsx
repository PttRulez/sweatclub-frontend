import { Route, Routes } from 'react-router-dom';
import BoardGames from '../pages/boardgames/BoardGames';
import CreateBoardGame from '../pages/boardgames/CreateBoardgame';
import MainPage from '../pages/MainPage';
import Auth from './Auth';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import Unauthorized from '../pages/Unauthorized';
import DoesntExist from '../pages/DoesntExist';
import Profile from '../pages/user/Profile';
import Boardgame from '../pages/boardgames/Boardgame';
import EditUser from '../pages/user/EditUser';
import EditGame from '../pages/games/EditGame';
import RatingsTable from '../pages/RatingsTable';
import { ABILITIES } from '../utils/constants';
import BoardGameForm from '../pages/boardgames/BoardgameForm';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Auth allowedAbilities={[ABILITIES.User]} />}>
        <Route path='/' element={<MainPage />} />

        <Route path='/boardgames' element={<BoardGames />} />
        <Route path='/boardgames/:id' element={<Boardgame />} />
        <Route path='/ratings-table' element={<RatingsTable />} />

        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/profile/edit' element={<EditUser />} />
      </Route>

      <Route element={<Auth allowedAbilities={[ABILITIES.Admin]} />}>
        <Route path='/games/:id/edit' element={<EditGame />} />

        <Route path='/boardgames/:id/edit' element={<BoardGameForm edit={true} />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='*' element={<DoesntExist />} />
    </Routes>
  );
};

export default AppRouter;
