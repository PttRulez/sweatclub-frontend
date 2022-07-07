import { getStoreLocal } from '../../app/helpers';

const initialState = {
  club: getStoreLocal('club'),
  clubs: [],
  loading: false,
};

const SET_CURRENT_CLUB = 'SET_CURRENT_CLUB';
const SET_CLUBS = 'SET_CLUBS';
const SET_LOADING = 'SET_LOADING'

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CLUB:
      localStorage.setItem('club', JSON.stringify(action.payload));
      return {
        ...state,
        club: action.payload,
      };
    case SET_CLUBS:
      return {
        ...state,
        clubs: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export const setCurrentClub = payload => ({ type: SET_CURRENT_CLUB, payload });
export const setClubs = payload => ({ type: SET_CLUBS, payload });
export const setLoading = payload => ({ type: SET_LOADING, payload });

export default reducer;
