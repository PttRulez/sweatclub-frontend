import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardGames from '../pages/boardgames/BoardGames';
import CreateBoardGame from '../pages/boardgames/Create';
import MainPage from '../pages/tasks/MainPage';
import Auth from './Auth';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import Tasks from '../pages/tasks/Tasks';
import { PokemonList } from '../pages/tasks/pokemons/PokemonList';
import Gradient from '../pages/tasks/Gradient';
import Menu from '../pages/tasks/menu/Menu';
import Hoc from '../pages/tasks/Hoc';
import CreateGame from '../pages/games/CreateGame';
import Unauthorized from '../pages/Unauthorized';
import DoesntExist from '../pages/DoesntExist';

const ABILITIES = {
  Admin: 'admin',
  User: 'user',
};

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Auth allowedAbilities={[ABILITIES.User]} />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/boardgames' element={<BoardGames />} />
        <Route path='/add-boardgame' element={<CreateBoardGame />} />
      </Route>

      <Route element={<Auth allowedAbilities={[ABILITIES.Admin]} />}>
        
        <Route path='/add-game' element={<CreateGame />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/tasks' element={<Tasks />} />
      <Route path='/tasks/pokemons' element={<PokemonList />} />
      <Route path='/tasks/gradient' element={<Gradient />} />
      <Route path='/tasks/menu' element={<Menu />} />
      <Route path='/tasks/hoc' element={<Hoc />} />

      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='*' element={<DoesntExist />} />
    </Routes>
  );
};

export default AppRouter;
